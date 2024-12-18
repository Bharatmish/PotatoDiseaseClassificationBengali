import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import cblogo from "./logoNavbar.png";
import image from "./background.jpg";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "flex-start", // Default alignment to start (left side)
    gap: "10px", // Space between buttons
    transition: "all 0.3s ease", // Smooth transition for movement
  },

  // Additional class when the summary is shown
  buttonAtEnd: {
    justifyContent: "flex-end", // Align buttons to the right (end of the page)
    position: "absolute", // Absolute positioning for both buttons
    bottom: "20px", // Adjust as needed to position the buttons near the bottom
    right: "20px", // Adjust as needed to move the buttons towards the right
    gap: "15px", // Space between the buttons
  },

  // Style for Hide Summary Button
  // Style for Hide Summary Button
  hideSummaryButton: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: "#be6a77", // Custom color for the button
    "&:hover": {
      backgroundColor: "#b94e51", // Hover effect color
    },
    fontSize: "16px",  // Button font size
    fontWeight: "bold", // Bold text
    padding: "10px 20px", // Button padding
    borderRadius: "25px", // Rounded corners for the button
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Shadow effect
    marginLeft:"20px",
  },

  // Style for Clear Button
  clearButton: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: "#be6a77", // Custom color for the button
    "&:hover": {
      backgroundColor: "#b94e51", // Hover effect color
    },
    fontSize: "16px",  // Button font size
    fontWeight: "bold", // Bold text
    padding: "10px 20px", // Button padding
    borderRadius: "25px", // Rounded corners for the button
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Shadow effect
    marginLeft:"20px",
  },
  
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: 'brown',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  },

  // New styles for the summary section
  summaryContainer: {
    width: '100%',
    margin: '0',
    padding: 'px', // Increase padding for a more spacious feel
    background: 'linear-gradient(135deg, #ffffff, #f0f0f0)', // Soft gradient background
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Light shadow for a subtle 3D effect
    borderRadius: '20px', // Rounded corners for a smoother appearance
    fontFamily: "'Roboto', sans-serif", // Modern font for better readability
    transition: 'transform 0.3s ease-in-out', // Smooth hover effect for interactive feel
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // Align items to the left
  },

buttonGrid: {
  width: '100%', // Ensure it takes full width
  margin: '0', // No margins to avoid centering
  padding: '0', // Remove any padding
},

summaryTitle: {
  fontSize: '2rem', // Larger title for more emphasis
  fontWeight: '700', // Bold for better readability
  color: '#2c3e50', // Dark color for a clean look
  textTransform: 'uppercase', // Make it bold and uppercase
  letterSpacing: '2px', // Slight spacing between letters for better impact
  marginBottom: '20px', // More space below the title
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Subtle text shadow for depth
},

summaryText: {
  fontSize: '1.2rem', // Slightly larger text for better readability
  lineHeight: '1.8', // More space between lines for clarity
  color: '#34495e', // Dark but soft text color
  whiteSpace: 'pre-line',
  wordWrap: 'break-word',
  letterSpacing: '0.5px',
  textAlign: 'justify', // Justified text for a neat appearance
  marginBottom: '20px',
  backgroundColor: '#f9f9f9', // Light background for text block
  padding: '15px', // Added padding for better spacing
  borderRadius: '10px', // Rounded corners for the text block
  boxShadow: 'inset 0px 4px 8px rgba(0, 0, 0, 0.1)', // Soft inset shadow for depth
  transition: 'transform 0.3s ease-in-out', // Smooth transition for hover effects
},



}));

const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);  // New state for toggling summary visibility
  let confidence = 0;

  const sendFile = async () => {
    if (selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      setIsloading(true); // Show loading spinner

      try {
        let res = await axios({
          method: "post",
          url: "https://potato-disease-prediction-bengali.onrender.com/predict", // Ensure this points to your backend
          data: formData,
        });

        if (res.status === 200) {
          setData(res.data); // Save the API response
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to process the image. Please try again.");
      } finally {
        setIsloading(false); // Hide loading spinner
      }
    }
  };

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
    setShowSummary(false);  // Reset the summary visibility when clearing data
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  // Function to toggle summary visibility
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Potato-disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!selectedFile ? classes.imageCardEmpty : ''}`}>
              {selectedFile && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Potato Leaf"
                  />
                </CardActionArea>
              )}
              {!selectedFile && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag & Drop an image of a potato plant leaf to Process"}
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              
              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row" className={classes.tableCell}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress color="secondary" className={classes.loader} />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          {data && (
  <Grid
    item
    className={`${classes.buttonGrid} ${showSummary ? classes.buttonAtEnd : ''}`} // Apply buttonAtEnd class conditionally
  >
    <ColorButton
      variant="contained"
      className={classes.clearButton}
      color="primary"
      component="span"
      size="large"
      onClick={clearData}
      startIcon={<Clear fontSize="large" />}
    >
      Clear
    </ColorButton>

    <ColorButton
      variant="contained"
      className={classes.hideSummaryButton} // Apply Hide Summary Button style
      color="primary"
      component="span"
      size="large"
      onClick={toggleSummary}
    >
      {showSummary ? "Hide Summary" : "Show Summary"}
    </ColorButton>
  </Grid>
)}

{showSummary && data && (
  <Grid item xs={12} className={classes.buttonGrid} style={{ width: '100%' }}>
  <CardContent className={classes.summaryContainer}>
    <Typography className={classes.summaryTitle}>Summary:</Typography>
    <Typography className={classes.summaryText}>
      {data.summary}
    </Typography>
  </CardContent>
</Grid>
)}

        </Grid>
      </Container>
    </React.Fragment>
  );


  
};


export default ImageUpload;
