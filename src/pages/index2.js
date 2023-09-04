import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField, MenuItem, Button, Radio, RadioGroup, Card, CardContent, Select, InputLabel} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const steps = ['เลือกรูปแบบโปรโมชั่น', 'เพิ่มรายละเอียดโปรโมชั่น', 'ตัวอย่างโปรโมชั่น'];
const daysOfWeek = ['วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัส', 'วันศุกร์', 'วันเสาร์', 'วันอาทิตย์'];

function Step1({setType,type,setProductType,productType}) {

    const handleSelectedChange = (event) => {
      setType(event.target.value)
    };

    const handleSelected2Change = (event) => {
        setProductType(event.target.value)
      };
  
    return (
      <>
      <Card sx={{
        marginTop:'20px',
        display: 'flex',
        width:'100%',
        border: '1px solid #ccc', 
      }}
      style={{
        boxShadow: ' 2px 9px #EADDCD',/* #D8E8DC */
      }}>
      <Container >
      <div style={{ /* ,backgroundColor: 'grey',opacity:0.5 */  }}>
      <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <div>
            <Grid item xs={6} md={10} sm={14} lg={14}>
            <br />
            <br />
                <Typography sx={{marginLeft:'20px'}} variant="h4" component="h4">
                    เลือกรูปแบบโปรโมชั่น
                </Typography>
                <br />

                <RadioGroup value={type} onChange={handleSelectedChange}>
                <Item>
                        <FormControlLabel
                            value="percent"
                            control={<Radio />}
                            label={<Box
                                border="1px solid black"
                                borderRadius="4px"
                                padding="16px"
                                display="block"
                                height='110px'
                                width='340px'
                            >
                                <Typography variant="h5" component="h5" style={{ color: "black" }}>
                                    เปอร์เซ็นต์
                                    <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>
                                        ระบุส่วนลดให้ลูกค้าแบบเป็น % เช่น อเมริกาโน่ลด 10%
                                    </Typography>
                                </Typography>
                            </Box>} />
                </Item>
                        <br />
                        <Item>
                        <FormControlLabel value="specific" control={<Radio />} label={<Box
                            border="1px solid black"
                            borderRadius="4px"
                            padding="16px"
                            display="block"
                            height='110px'
                            width='340px'
                        >
                            <Typography variant="h5" component="h5" style={{ color: "black" }}>
                                ราคาแบบเจาะจง <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>ระบุส่วนลดให้ลูกค้าแบบเป็นราคาเฉพาะเจาะจง เช่น อเมริกาโน่ลด 5 บาท</Typography>
                            </Typography>
                        </Box>} />
                        </Item>
                        <br />
                        <Item>
                        <FormControlLabel value="free" control={<Radio />} label={<Box
                            border="1px solid black"
                            borderRadius="4px"
                            padding="16px"
                            display="block"
                            height='110px'
                            width='340px'
                        >
                            <Typography variant="h5" component="h5" style={{ color: "black" }}>
                                เมนูแถมฟรี <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>ระบุส่วนลดให้ลูกค้าแบบเป็นราคาเฉพาะเจาะจง เช่น อเมริกาโน่ลด 5 บาท</Typography>
                            </Typography>
                        </Box>} />
                        </Item>
                    </RadioGroup>
                    </Grid>
            </div>


        <div>
          <Grid item xs={6} md={10} sm={14} lg={14}>
          <br />
          <br />
                <Typography sx={{marginLeft:'20px'}} variant="h4" component="h4">
                    เลือกรูปแบบรายการ
                </Typography>
                <br />

                <RadioGroup value={productType} onChange={handleSelected2Change} style={{ display: 'flex', flexDirection: 'column' }}>
                <Item>
                    <FormControlLabel value="menu" control={<Radio />} label={<Box
                        border="1px solid black"
                        borderRadius="4px"
                        padding="16px"
                        display="block"
                        height='110px'
                        width='340px'
                    >
                        <Typography variant="h5" component="h5" style={{ color: "black" }}>
                            เฉพาะรายการ <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>ลดราคาเฉพาะเมนูที่ต้องการ</Typography>
                        </Typography>
                    </Box>} />
                </Item>
                    <br />
                <Item>
                    <FormControlLabel value="category" control={<Radio />} label={<Box
                        border="1px solid black"
                        borderRadius="4px"
                        padding="16px"
                        display="block"
                        height='110px'
                        width='340px'
                    >
                        <Typography variant="h5" component="h5" style={{ color: "black" }}>
                            หมวดหมู่ <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>ลดราคาทุกรายการในหมวดหมู่</Typography>
                        </Typography>
                    </Box>} />
                </Item>
                    <br />
                <Item>
                    <FormControlLabel value="amount" control={<Radio />} label={<Box
                        border="1px solid black"
                        borderRadius="4px"
                        padding="16px"
                        display="block"
                        height='110px'
                        width='340px'
                    >
                        <Typography variant="h5" component="h5" style={{ color: "black" }}>
                            คำสั่งซื้อ <Typography variant="h6" component="h6" style={{ color: "#64748B" }}>ลดราคาสำหรับทั้งคำสั้งซื้อ</Typography>
                        </Typography>
                    </Box>} />
                </Item>
                </RadioGroup>
                </Grid>
                <br/>
                <br />
            </div>
            </Grid>
      </div>
      </Container>
      </Card>
      </>
    );
}


function Step2({ type,productType,selectedDays,setSelectedDays,data,setData,selectedMenus,setSelectedMenus,
                 selectedCategories,setSelectedCategories,amount,setAmount,selectedStartDate,setSelectedStartDate,
                 selectedFinishDate,setSelectedFinishDate,selectedStartTime,setSelectedStartTime,selectedFinishTime,setSelectedFinishTime }) {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const initial = useRef(false);


    const isDataValid = (data) => typeof data === 'number' && data > 0;
  
    const handleDaySelect = (event, newSelectedDays) => {
      setSelectedDays(newSelectedDays);
    };

    const handleMenuChange = (event) => {
      setSelectedMenus(event.target.value);
    };

    const handleCategoryChange = (event) => {
      setSelectedCategories(event.target.value);
    };

    function handleClearCategorySelection(){
      setSelectedCategories([]);
    }

  
    function handleClearSelection(){
      setSelectedMenus([]);
    }

    const handleStartDateChange = (date) => {
      setSelectedStartDate(date);
    
      if (selectedFinishDate && dayjs(date).isAfter(selectedFinishDate)) {
        Swal.fire('วันเริ่มต้นห้ามมากกว่าวันสิ้นสุด');
        setSelectedStartDate(null);
      }
    };
    
    const handleFinishDateChange = (date) => {
      setSelectedFinishDate(date);
    
      if (date && dayjs(date).isBefore(selectedStartDate)) {
        Swal.fire('วันเริ่มต้นห้ามมากกว่าวันสิ้นสุด');
        setSelectedFinishDate(null);
      }
    };
    

    const handleStartTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedStartTime(newTime);
    
      if (selectedFinishTime && dayjs(newTime, 'HH:mm').isAfter(dayjs(selectedFinishTime, 'HH:mm'))) {
        Swal.fire('เวลาเริ่มห้ามมากกว่าเวลาสิ้นสุด');
        setSelectedStartTime('');
      }
    };
    
    const handleFinishTimeChange = (event) => {
      const newTime = event.target.value;
      setSelectedFinishTime(newTime);
    
      if (newTime && dayjs(newTime, 'HH:mm').isBefore(dayjs(selectedStartTime, 'HH:mm'))) {
        Swal.fire('เวลาเริ่มห้ามมากกว่าเวลาสิ้นสุด');
        setSelectedFinishTime('');
      }
    };

    //menu
    const renderMenus = () => {
      return (
        <div style={{ display: 'flex'}}>
      <FormGroup sx={{ m: 1, width: 400 }}>
      <Select
      fullWidth
        variant="standard"
        id="menu-select"
        multiple
        value={selectedMenus}
        onChange={handleMenuChange}
        label="Select Menus"
        renderValue={(selected) =>
          selected
            .map((menuId) =>
              menus.find((menu) => menu._id === menuId)?.name || ""
            )
            .join(", ")
        }
        MenuProps={MenuProps}
      >
        {menus.map((menu) => (
          <MenuItem key={menu._id} value={menu._id} style={{
            color: selectedMenus.includes(menu._id) ? 'green' : 'black',
            backgroundColor:'#E2E3E3',
          }}>
            <Checkbox checked={selectedMenus.indexOf(menu._id) > -1} />
              <ListItemText primary={menu.name} />
          </MenuItem>
        ))}
        
      </Select>
        </FormGroup>
        <IconButton
          aria-label="Clear Selection"
          onClick={handleClearSelection}
          size="small"
        >
          <ClearIcon />
        </IconButton>
          </div>
      )
    };

    //category
    const renderCategories = () => {
      return (
        <div style={{ display: 'flex'}}>
      <FormGroup sx={{ m: 1, width: 400 }}>
      <Select
      fullWidth
        variant="standard"
        id="menu-select"
        multiple
        value={selectedCategories}
        onChange={handleCategoryChange}
        label="Select Category"
        renderValue={(selected) =>
          selected
            .map((categoryId) =>
              categories.find((category) => category._id === categoryId)?.name || ""
            )
            .join(", ")
        }
        MenuProps={MenuProps}
      >
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id} style={{
            color: selectedCategories.includes(category._id) ? 'green' : 'black',
            backgroundColor:'#E2E3E3',
          }}>
            <Checkbox checked={selectedCategories.indexOf(category._id) > -1} />
              <ListItemText primary={category.name} />
          </MenuItem>
        ))}
        
      </Select>
        </FormGroup>
        <IconButton
          aria-label="Clear Selection"
          onClick={handleClearSelection}
          size="small"
        >
          <ClearIcon />
        </IconButton>
          </div>
      )
    };

    const renderPromotionDetails = () => {
      return (
        /* left */
        <div>
              <Box sx={{
                "& > :not(style)": { m: 2 },
              }} noValidate autoComplete="off">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
          <Typography variant="h4" component="h4">
                  ระยะเวลาโปรโมชั่น
          </Typography>
          <br/>
          <Typography variant="h5" component="h5">
                  วันเริ่มต้น
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props) => <TextField
                sx={{
                  border: '3px solid orange', 
                  borderRadius: '8px', 
                }}
                {...props}
              />}
              value={selectedStartDate}
              label="วันเริ่มต้น"
              onChange={handleStartDateChange} 
            />
          </LocalizationProvider>
          <Typography variant="h5" component="h5">
                  วันสิ้นสุด
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="วันสิ้นสุด"
              renderInput={(props) => <TextField
                sx={{
                  border: '3px solid orange', 
                  borderRadius: '8px', 
                }}
                {...props}
              />}
              value={selectedFinishDate}
              onChange={handleFinishDateChange} 
            />
          </LocalizationProvider>

          </Box>
        
        </div>
      );
    };

    useEffect(() => {
      async function fetchMenus() {
        try {
          const res = await fetch("http://localhost:5000/menus");
          const data = await res.json();
          setMenus(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching menus:", error);
        }
      }

      async function fetchCategories() {
        try {
          const res = await fetch("http://localhost:5000/category");
          const data = await res.json();
          setCategories(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching menus:", error);
        }
      }
  
      if (!initial.current) {
        initial.current = true;
        console.log(initial.current);
        fetchMenus();
        fetchCategories();
      }
    }, []);
  
    return (
      <Card sx={{
        marginTop:'20px',
        display: 'flex',
        width:'100%',
        border: '1px solid #ccc', 
      }}
      style={{
        boxShadow: ' 2px 9px #EADDCD',/* #D8E8DC */
      }}>
        <Container>
      <div style={{ display: 'flex',marginTop:'30px' }}>
      <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            spacing={3}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {/* left side */}
      <Box style={{ flex: 1.5 }}>
      {productType === 'menu' ? (
            <div style={{marginTop:'5px'}}>
            <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            spacing={3}
            rowSpacing={1}
            >
              <Grid item xs={11}>
                <Typography variant="h4" component="h4">
                  เลือกเมนู
                </Typography>
                <br/>
              </Grid>
            </Grid>
            {renderMenus()}
            </div>
          ): productType === 'category' ? (
            <div  style={{marginTop:'5px'}}>
              <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            spacing={3}
            rowSpacing={1}
            >
              <Grid item xs={11}>
               <Typography variant="h4" component="h4">
                  เลือกหมวดหมู่
                </Typography>
                <br/>
              </Grid>
            </Grid>
              {renderCategories()}
            </div>
          ): productType === 'amount' ? (
            <div style={{marginTop:'5px'}}>
              <Grid container>
              <Grid item xs={11}>
               <Typography variant="h4" component="h4">
                  คำสั่งซื้อ
               </Typography>
               <br/>
               </Grid>
              <TextField
                inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 20}}}
                label="free"
                color="secondary"
                helperText="ขั้นต่ำคำสั่งซื้อ"
                error={amount<0 && typeof amount !== 'number'}
                value= {amount}
                onChange={(e) => setAmount(e.target.value)}
                focused
              />
              </Grid>
            </div>
          ):null}
          {renderPromotionDetails()}
        </Box>

        


        {/*  right */}
      <Box style={{ flex: 1.2}}>
        {type === "percent" ? (
          <>
            <Typography variant="h4" component="h4">
                  เปอร์เซ็นต์
          </Typography>
          <br/>
            <TextField
                inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 20}}}
                label="percent"
                value={data}
                color="secondary"
                error={data<=0 && typeof data !== 'number'}
                helperText={"กรุณาใส่มูลค่าส่วนลด (เปอร์เซ็น)"}
                focused
                onChange={(e) => setData(e.target.value)}
              />
          </>
        ) : type === "specific" ? (
          <div>
             <Typography variant="h4" component="h4">
                  เจาะจง
            </Typography>
          <br/>
            <TextField
                inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 20}}}
                label="specific"
                value={data}
                color="secondary"
                error={data<=0 && typeof data !== 'number'}
                helperText="กรุณาใส่มูลค่าส่วนลด (ราคา)"
                focused
                onChange={(e) => setData(e.target.value)}
              />
          </div>
        ) : type === "free" ? (
          <div>
             <Typography variant="h4" component="h4">
                  ฟรี
          </Typography>
          <br/>
            <TextField
                inputProps={{style: {fontSize: 25}}}
                InputLabelProps={{style: {fontSize: 20}}}
                label="free"
                value={data}
                color="secondary"
                error={data<=0 && typeof data !== 'number'}
                helperText="ขั้นต่ำคำสั่งซื้อ"
                focused
                onChange={(e) => setData(e.target.value)}
              />
          </div>
        ) : null}

          <br/>
          <br/>
          <Typography variant="h4" component="h4">
                  วัน
          </Typography>
          <br/>
          <ToggleButtonGroup
            value={selectedDays}
            onChange={handleDaySelect}
            aria-label="Days of Week"
          >
            {daysOfWeek.map((day) => (
              <ToggleButton sx={{ "&.Mui-selected, &.Mui-selected:hover": {color: "green"}, border: '1px solid #ccc', }} 
              key={day} value={day}>
                {day}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>


          <div style={{marginTop:'105px'}}>
            <div style={{ marginRight: 'auto' }}>
          <Typography variant="h5" component="h5">
                  เวลาเริ่ม
          </Typography>
          <br/>
          <TextField
            focused
            style={{width:250, marginTop:'18px'}}
            label="เวลาเริ่ม"
            name="start_time"
            type="time"
            error={!selectedStartTime}
            onChange={handleStartTimeChange}
            value={selectedStartTime}
            inputProps={{
              step: 300, 
            }}
          />
          </div>
          <br/>
          <div style={{marginRight:'60px',marginTop:'8px',marginBottom:'80px'}}>
          <Typography variant="h5" component="h5">
                 เวลาสิ้นสุด
          </Typography>
          <TextField
            focused
            style={{width:250, marginTop:'35px'}}
            label="เวลาสิ้นสุด"
            name="finish_time"
            type="time"
            error={!selectedFinishTime}
            onChange={handleFinishTimeChange}
            value={selectedFinishTime}
            inputProps={{
              step: 300, 
            }}
          />
          </div>
          </div>
        </Box>      
        </Grid>
      </div>
      </Container>
      </Card>
    );
}
  


function Step3({formik,image,setImage}) {

  function handleChangeFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    reader.readAsDataURL(file);
  }

  function handleReset(){
    formik2.resetForm()
    setImage(null)
  }

  /* function handlePreview(){

  } */


  return (
    <>
      <Card
      sx={{
        marginTop:'20px',
        display: 'flex',
        width:'100%',
        border: '1px solid #ccc', 
      }}
      style={{
        boxShadow: ' 2px 9px #EADDCD',/* #D8E8DC */
      }}
      >
        <Container>
        <div>
          <Typography sx={{marginTop:5}} variant="h4" component="h4">
          กรุณาใส่รูปภาพ Banner
          </Typography>
      <br/>
      {/* <span style={{color:'red'}}>* รูปภาพจะแสดงในรูปแบบ 1200 x 250</span> */}
      <Grid
              container
              justifyContent="space-evenly"
              alignItems="flex-start"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
      {/* Image */}
      <Box>
      <br/>
      {/* <Box>
        <input id="file-input" type="file" onChange={handleChangeFile} accept="image/*" />
        <br/>
        {image && <img src={image} style={{ width: '1200px', height: '250px' }} alt="Preview" />}
      </Box> */}
      <Box sx={{ m: 1 }}>
                  <label htmlFor="upload-photo">
                    {image ? (
                      <img
                      /* style={{ width: '1200px', height: '250px' }} */
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        src={image}
                        alt="Preview"
                        variant="square"
                        width="1250px"
                      />
                    ) : (
                      <AddPhotoAlternateIcon
                        style={{
                          width: "100%",
                          height: "250px",
                          color: "#DCD9D8",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </label>
                  <input
                    style={{ display: "none", width: '1200px', height: '250px' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={handleChangeFile}
                    accept="image/*"
                  />
                </Box>
      {/* Image responsive */}

      {/* Topic and Message */}

      <Box
        sx={{
         "& > :not(style)": { m: 3 },
        }}
         noValidate
         autoComplete="off"
      >
      <Item>
        <TextField
            inputProps={{style: {fontSize: 25}}}
            InputLabelProps={{style: {fontSize: 20}}}
            focused
            label="หัวข้อ"
            name="topic"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.topic}
            error={formik.touched.topic && !!formik.errors.topic}
            helperText={formik.touched.topic && formik.errors.topic}
            multiline
            fullWidth
          />
         </Item>
         <Item>
        <TextField
            inputProps={{style: {fontSize: 25}}}
            InputLabelProps={{style: {fontSize: 20}}}
            focused
            label="ข้อความ"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            error={formik.touched.message && !!formik.errors.message}
            helperText={formik.touched.message && formik.errors.message}
            multiline
            fullWidth
          />
          </Item>
          </Box>
          </Box>
   
     {/* <Button onClick={handlePreview}>
        <h1>Preview</h1>
      </Button> */}
      </Grid>
      </div>
      </Container>
      </Card>
    </>
  );
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [type, setType] = useState('');
  const [productType, setProductType] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [data, setData] = useState(0);
  const [image, setImage] = useState(null);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(0);
  const initial = useRef(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedFinishDate, setSelectedFinishDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('12:00');
  const [selectedFinishTime, setSelectedFinishTime] = useState("12:00");

  const validationSchema = Yup.object().shape({
    topic: Yup.string().required('กรุณาใส่หัวข้อ'),
    message: Yup.string().required('กรุณาใส่ข้อความ'),
  });

  const formik = useFormik({
    initialValues: {
      topic:'',
      message:'',
    },
    validationSchema
  })

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if(!type && !productType){
      Swal.fire("Error",'คุณยังไม่ได้เลือกรูปแบบโปรโมชั่น','error');
      return;
    }
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 setType={setType} type={type} setProductType={setProductType} productType={productType} />;
      case 1:
        return <Step2 type={type} productType={productType} selectedDays={selectedDays} setSelectedDays={setSelectedDays} 
        data={data} setData={setData} selectedMenus={selectedMenus} setSelectedMenus={setSelectedMenus}
        selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} amount={amount} setAmount={setAmount}
        selectedStartDate={selectedStartDate} setSelectedStartDate={setSelectedStartDate} selectedFinishDate={selectedFinishDate} setSelectedFinishDate={setSelectedFinishDate}
        selectedStartTime={selectedStartTime} setSelectedStartTime={setSelectedStartTime} selectedFinishTime={selectedFinishTime} setSelectedFinishTime={setSelectedFinishTime}
        />;
      case 2:
        return <Step3 formik={formik} image={image} setImage={setImage}/>;
      default:
        return null;
    }
  };

  async function handleSubmit(e){
    e.preventDefault();
    console.log(type);
    console.log(selectedDays);

    const menu = selectedMenus;
    const category = selectedCategories;
    console.log(menu);
    console.log(category);
    if (!image || !type || !productType || !data || !selectedDays || !selectedStartDate || !selectedFinishDate || !selectedStartTime || !selectedFinishTime 
      || selectedStartDate>selectedFinishDate || selectedStartTime>selectedFinishTime || !formik.values.topic || !formik.values.message ) {
      Swal.fire("Error", "กรุณากรอกข้อมูลให้ถูกต้อง", "error");
      return;
    }

    Swal.fire({
      title: "ต้องการเพิ่ม Promotion นี้หรือไม่",
      confirmButtonText: "ยืนยัน",
      showDenyButton: true,
      denyButtonText: "ยกเลิก", 
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:5000/promotions", {
              method: "POST",
              body: JSON.stringify({
                id: id+1,
                type: type,
                productType: productType,
                data: data,
                days: selectedDays,
                start_date: selectedStartDate,
                finish_date: selectedFinishDate,
                start_time: selectedStartTime,
                finish_time: selectedFinishTime,
                image: image,
                topic: formik.values.topic,
                message: formik.values.message,
                menuId: menu,
                category: category,
                amount: amount,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              Swal.fire(`เพิ่ม Promotion ไม่สำเร็จ`, "", "error");
              throw new Error("Failed to add new promotion");
            }
            Swal.fire(`เพิ่ม Promotion แล้ว`, "", "success");
            const resJson = await response.json();
            console.log(resJson);
            setImage(null);
            setType("");
            setProductType("");
            setSelectedDays([]);
            setData("");
            formik.resetForm();
            formik2.resetForm();
            setActiveStep(0);
            setSkipped(new Set());
            setSelectedCategories([]);
            setSelectedMenus([]);
            setAmount(0);
            fetchPromotions();
        }catch(error){
          console.log("Error:", error.message);
        }
      }})
  }

  const fetchPromotions = async () => {
    try {
      const res = await fetch('http://localhost:5000/promotions');
      const data = await res.json();
      const maxId = data.reduce((max, item) => {
        return item.id > max ? item.id : max;
      }, 0);
      setId(maxId);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [id]);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%', padding: '25px' }}>
        <Stepper activeStep={activeStep} sx={{ mt: '20px',padding: '10px' }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps }><span style={{fontSize: 22}}>{label}</span></StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {renderStepContent(activeStep)}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1,fontSize:25 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button sx={{fontSize:25}} onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DashboardLayout>
  );
}