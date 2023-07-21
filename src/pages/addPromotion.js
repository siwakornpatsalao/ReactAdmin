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


function Step2({ type,productType,selectedDays,setSelectedDays,data,setData,start_date,setStart_Date,finish_date,setFinish_Date,start_time,setStart_Time,finish_time,setFinish_Time }) {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const initial = useRef(false);

    const isDataValid = (data) => data < 0;
    const isStartDateValid = (start_date) => start_date == '';
    const isFinishDateValid = (finish_date) => finish_date == '';
    const isStartTimeValid = (start_time) => start_time == '';
    const isFinishTimeValid = (finish_time) => finish_time == '';
  
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
            control={<Checkbox defaultChecked />}
            label={menu.name}
          />
        </FormGroup>
      ));
    };

    const renderCategories = () => {
      return categories.map((category) => (
        <FormGroup key={category._id}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={category.name}
          />
        </FormGroup>
      ));
    };
  
    const renderPromotionDetails = () => {
      return (
        <div>
          <h2>ระยะเวลาโปรโมชั่น</h2>
          <h4>วันเริ่มต้น</h4>
          <TextField
            label="วันเริ่มต้น"
            type="date"
            value={start_date}
            onChange={(e) => setStart_Date(e.target.value)}
            error={isStartDateValid(start_date)}
            helperText='กรุณาใส่วันเริ่มต้น'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <h4>วันสิ้นสุด</h4>
          <TextField
            label="วันสิ้นสุด"
            type="date"
            value={finish_date}
            onChange={(e) => setFinish_Date(e.target.value)}
            error={isFinishDateValid(finish_date)}
            helperText='กรุณาใส่วันสิ้นสุด'
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
            label="Alarm clock"
            type="time"
            value={start_time}
            onChange={(e) => setStart_Time(e.target.value)}
            error={isStartTimeValid(start_time)}
            helperText='กรุณาใส่เวลาเริ่ม'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <h4>เวลาสิ้นสุด</h4>
          <TextField
            label="Alarm clock"
            type="time"
            value={finish_time}
            onChange={(e) => setFinish_Time(e.target.value)}
            error={isFinishTimeValid(finish_time)}
            helperText='กรุณาใส่เวลาสิ้นสุด'
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
              ขั้นต่ำคำสั่งซื้อ
            </div>
          ):null}
        </div>
        </Box>
      </div>
    );
}
  


function Step3({topic,setTopic,message,setMessage,image,setImage}) {

  const isTopicValid = (topic) => topic=='';
  const isMessageValid = (message) => message=='';

  function handleChangeFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
        การแสดงผล
        <input id="file-input" type="file" onChange={handleChangeFile} accept="image/*" />
        {image && (
              <img src={image} style={{ maxWidth: "100%", height: "500px" }} alt="Preview" />
        )}
        <TextField
                label="หัวข้อ"
                value={topic}
                color="secondary"
                error={isTopicValid(topic)}
                helperText="กรุณาใส่หัวข้อ"
                focused
                onChange={(e) => setTopic(e.target.value)}
        />
        <TextField
                label="ข้อความ"
                value={message}
                color="secondary"
                error={isMessageValid(message)}
                helperText="กรุณาใส่ข้อความ"
                focused
                onChange={(e) => setMessage(e.target.value)}
        />
        <Button><h1>Review</h1></Button>
    </div>
    // Add your content for step 3 here
  );
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [type, setType] = useState('');
  const [productType, setProductType] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [data, setData] = useState('');
  const [start_date, setStart_Date] = useState('');
  const [finish_date, setFinish_Date] = useState('');
  const [start_time, setStart_Time] = useState('');
  const [finish_time, setFinish_Time] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

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
        data={data} setData={setData} start_date={start_date} setStart_Date={setStart_Date} 
        finish_date={finish_date} setFinish_Date={setFinish_Date} start_time={start_time} setStart_Time={setStart_Time} 
        finish_time={finish_time} setFinish_Time={setFinish_Time}/>;
      case 2:
        return <Step3 topic={topic} setTopic={setTopic} message={message} setMessage={setMessage} image={image} setImage={setImage}/>;
      default:
        return null;
    }
  };

  async function handleSubmit(e){
    e.preventDefault();
    console.log(type);
    console.log(selectedDays);
    if (!image || !type || !productType || !data || !start_date || !finish_date || !start_time || !finish_time || !topic || !message ||!selectedDays) {
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
                type: type,
                productType: productType,
                data: data,
                days: selectedDays,
                start_date: start_date,
                finish_date: finish_date,
                start_time: start_time,
                finish_time: finish_time,
                image: image,
                topic: topic,
                message: message,
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
            setStart_Date("");
            setFinish_Date("");
            setStart_Time("");
            setFinish_Time("");
            setTopic("");
            setMessage("");
            setActiveStep(0);
            setSkipped(new Set());
        }catch(error){
          console.log("Error:", error.message);
        }
      }})
  }

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
