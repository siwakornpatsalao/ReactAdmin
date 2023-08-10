import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField, MenuItem, Button, Radio, RadioGroup} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

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
      <div>
        <h1>เลือกรูปแบบโปรโมชั่น</h1>
        <RadioGroup value={type} onChange={handleSelectedChange} >
          <FormControlLabel value="percent" control={<Radio />} label="เปอร์เซ็นต์" />
          <FormControlLabel value="specific" control={<Radio />} label="ราคาแบบเจาะจง" />
          <FormControlLabel value="free" control={<Radio />} label="เมนูแถมฟรี" />
        </RadioGroup>

        <h1>เลือกรูปแบบโปรโมชั่นให้สินค้า</h1>
        <RadioGroup value={productType} onChange={handleSelected2Change} >
          <FormControlLabel value="menu" control={<Radio />} label="เฉพาะรายการ" />
          <FormControlLabel value="category" control={<Radio />} label="หมวดหมู่" />
          <FormControlLabel value="amount" control={<Radio />} label="คำสั่งซื้อ" />
        </RadioGroup>
      </div>
    );
}


function Step2({ type,productType,selectedDays,setSelectedDays,data,setData,formik,selectedMenus,setSelectedMenus,
                  selectedCategories,setSelectedCategories,amount,setAmount }) {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const initial = useRef(false);

    const isDataValid = (data) => data < 0;

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
  
    const handleDaySelect = (event, newSelectedDays) => {
      setSelectedDays(newSelectedDays);
    };
  
    const renderMenus = () => {
      return menus.map((menu) => (
        <FormGroup key={menu._id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMenus.includes(menu._id)}
                onChange={() =>
                  setSelectedMenus((prev) =>
                    prev.includes(menu._id)
                      ? prev.filter((id) => id !== menu._id)
                      : [...prev, menu._id]
                  )
                }
              />
            }
            label={menu.name}
          />
        </FormGroup>
      ))
    };

    const renderCategories = () => {
      return categories.map((category) => (
        <FormGroup key={category._id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategories.includes(category._id)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category._id)
                      ? prev.filter((id) => id !== category._id)
                      : [...prev, category._id]
                  )
                }
              />
            }
            label={category.name}
          />
        </FormGroup>
      ))
    };
  
    const renderPromotionDetails = () => {
      return (
        <div>
          <h2>ระยะเวลาโปรโมชั่น</h2>
          <h4>วันเริ่มต้น</h4>
          <TextField
            focused
            label="วันเริ่ม"
            name="start_date"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.start_date}
            error={formik.touched.start_date && !!formik.errors.start_date}
            helperText={formik.touched.start_date && formik.errors.start_date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <h4>วันสิ้นสุด</h4>
          <TextField
            focused
            label="วันสิ้นสุด"
            name="finish_date"
            type="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.finish_date}
            error={formik.touched.finish_date && !!formik.errors.finish_date}
            helperText={formik.touched.finish_date && formik.errors.finish_date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <h4>วัน</h4>
          <ToggleButtonGroup
            value={selectedDays}
            onChange={handleDaySelect}
            aria-label="Days of Week"
          >
            {daysOfWeek.map((day) => (
              <ToggleButton key={day} value={day}>
                {day}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <h4>เวลาเริ่ม</h4>
          <TextField
            focused
            label="เวลาเริ่ม"
            name="start_time"
            type="time"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.start_time}
            error={formik.touched.start_time && !!formik.errors.start_time}
            helperText={formik.touched.start_time && formik.errors.start_time}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <h4>เวลาสิ้นสุด</h4>
          <TextField
            focused
            label="เวลาสิ้นสุด"
            name="finish_time"
            type="time"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.finish_time}
            error={formik.touched.finish_time && !!formik.errors.finish_time}
            helperText={formik.touched.finish_time && formik.errors.finish_time}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
      );
    };
  
    return (
      <div style={{ display: 'flex' }}>
        <Box style={{ flex: 1 }}>
        <div>
        {type === "percent" ? (
          <div>
            <h2>เปอร์เซ็นต์</h2>
            <TextField
                label="percent"
                value={data}
                color="secondary"
                error={isDataValid(data)}
                helperText="กรุณาใส่มูลค่าส่วนลด (เปอร์เซ็น)"
                focused
                onChange={(e) => setData(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : type === "specific" ? (
          <div>
            <h2>เจาะจง</h2>
            <TextField
                label="specific"
                value={data}
                color="secondary"
                error={isDataValid(data)}
                helperText="กรุณาใส่มูลค่าส่วนลด (ราคา)"
                focused
                onChange={(e) => setData(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : type === "free" ? (
          <div>
            <h2>ฟรี</h2>
            <TextField
                label="free"
                value={data}
                color="secondary"
                error={isDataValid(data)}
                helperText="ขั้นต่ำคำสั่งซื้อ"
                focused
                onChange={(e) => setData(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : null}
        </div>
        </Box>

        <Box style={{ flex: 1 }}>
        <div>
          {productType === 'menu' ? (
            <div>
              <h2>เลือกเมนู</h2>
              {renderMenus()}
            </div>
          ): productType === 'category' ? (
            <div>
              <h2>เลือกหมวดหมู่</h2>
              {renderCategories()}
            </div>
          ): productType === 'amount' ? (
            <div>
              <h2>คำสั่งซื้อ</h2>
              <TextField
                label="free"
                color="secondary"
                helperText="ขั้นต่ำคำสั่งซื้อ"
                value= {amount}
                onChange={(e) => setAmount(e.target.value)}
                focused
              />
            </div>
          ):null}
        </div>
        </Box>
      </div>
    );
}
  


function Step3({formik2,image,setImage}) {

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


  return (
    <div>
      {/* Image */}
      กรุณาใส่รูปภาพ Banner
      <br/>
      <span style={{color:'red'}}>* รูปภาพจะแสดงในรูปแบบ 1200 x 250</span>
      <Box  sx={{ display: 'flex', justifyContent:'center'}}>
      <Box >
        <input id="file-input" type="file" onChange={handleChangeFile} accept="image/*" />
        <br/>
        <br/>
        {image && <img src={image} style={{ width: '1200px', height: '250px' }} alt="Preview" />}
      </Box>

      {/* Topic and Message */}
      {/* <Box sx={{  m: 1, width: "25ch",}}>
        <Box sx={{ mb: 2 }}>
        <TextField
            focused
            label="หัวข้อ"
            name="topic"
            onBlur={formik2.handleBlur}
            onChange={formik2.handleChange}
            value={formik2.values.topic}
            error={formik2.touched.topic && !!formik2.errors.topic}
            helperText={formik2.touched.topic && formik2.errors.topic}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
        <TextField
            focused
            label="ข้อความ"
            name="message"
            onBlur={formik2.handleBlur}
            onChange={formik2.handleChange}
            value={formik2.values.message}
            error={formik2.touched.message && !!formik2.errors.message}
            helperText={formik2.touched.message && formik2.errors.message}
          />
        </Box>

      <Button onClick={handleReset}>
        <h1>Reset</h1>
      </Button>
      </Box> */}
      </Box>
    </div>
  );
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [type, setType] = useState('');
  const [productType, setProductType] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(0);
  const initial = useRef(false);

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required('กรุณาใส่วันเริ่ม'),
    finish_date: Yup.string().required('กรุณาใส่วันสิ้นสุด'),
    start_time: Yup.string().required('กรุณาใส่เวลาเริ่ม'),
    finish_time: Yup.string().required('กรุณาใส่เวลาสิ้นสุด'),
  });

  const formik = useFormik({
    initialValues: {
      start_date:'',
      finish_date:'',
      start_time:'',
      finish_time:'',
    },
    validationSchema
  })

  const validationSchema2 = Yup.object().shape({
    topic: Yup.string().required('กรุณาใส่หัวข้อ'),
    message: Yup.string().required('กรุณาใส่หัวข้อ'),
  });

  const formik2 = useFormik({
    initialValues: {
      topic:'',
      message:'',
    },
    validationSchema2
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
        data={data} setData={setData} formik={formik} selectedMenus={selectedMenus} setSelectedMenus={setSelectedMenus}
        selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} amount={amount} setAmount={setAmount}/>;
      case 2:
        return <Step3 formik2={formik2} image={image} setImage={setImage}/>;
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
    if (!image || !type || !productType || !data || !selectedDays) {
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
                start_date: formik.values.start_date,
                finish_date: formik.values.finish_date,
                start_time: formik.values.start_time,
                finish_time: formik.values.finish_time,
                image: image,
                topic: formik2.values.topic,
                message: formik2.values.message,
                menu: menu,
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
      <Box sx={{ width: '100%', padding: '20px' }}>
        <Stepper activeStep={activeStep} sx={{ padding: '50px' }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
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
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DashboardLayout>
  );
}
