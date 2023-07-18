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

const steps = ['เลือกรูปแบบโปรโมชั่น', 'เพิ่มรายละเอียดโปรโมชั่น', 'ตัวอย่างโปรโมชั่น'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Step1({setSelected,selected,setSelected2,selected2}) {
  
    const handleSelectedChange = (event) => {
      setSelected(event.target.value);
    };

    const handleSelected2Change = (event) => {
        setSelected2(event.target.value);
      };
  
    return (
      <div>
        <h1>เลือกรูปแบบโปรโมชั่น</h1>
        <RadioGroup value={selected} onChange={handleSelectedChange}>
          <FormControlLabel value="percent" control={<Radio />} label="เปอร์เซ็นต์" />
          <FormControlLabel value="specific" control={<Radio />} label="ราคาแบบเจาะจง" />
          <FormControlLabel value="free" control={<Radio />} label="เมนูแถมฟรี" />
        </RadioGroup>

        <h1>เลือกรูปแบบโปรโมชั่นให้สินค้า</h1>
        <RadioGroup value={selected2} onChange={handleSelected2Change}>
          <FormControlLabel value="menu" control={<Radio />} label="เฉพาะรายการ" />
          <FormControlLabel value="category" control={<Radio />} label="หมวดหมู่" />
          <FormControlLabel value="amount" control={<Radio />} label="คำสั่งซื้อ" />
        </RadioGroup>
      </div>
    );
}


function Step2({ selected,selected2 }) {
    const [menus, setMenus] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [percent, setPercent] = useState(0);
    const [specific, setSpecific] = useState(0);
    const [free, setFree] = useState(0);

    const isPercentValid = (percent) => percent <0
    const isSpecificValid = (specific) => specific <0
    const isFreeValid = (free) => free <0
  
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
  
      fetchMenus();
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
  
    const renderPromotionDetails = () => {
      return (
        <div>
          <h2>ระยะเวลาโปรโมชั่น</h2>
          <h4>วันเริ่มต้น</h4>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2023-07-17"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <h4>วันสิ้นสุด</h4>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2023-07-24"
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
            id="time"
            label="Alarm clock"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <h4>เวลาสิ้นสุด</h4>
          <TextField
            id="time"
            label="Alarm clock"
            type="time"
            defaultValue="16:30"
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
        {selected === "percent" ? (
          <div>
            <h2>เปอร์เซ็นต์</h2>
            <TextField
                label="percent"
                value={percent}
                color="secondary"
                error={isPercentValid(percent)}
                helperText="กรุณาใส่มูลค่าส่วนลด (เปอร์เซ็น)"
                focused
                onChange={(e) => setPercent(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : selected === "specific" ? (
          <div>
            <h2>เจาะจง</h2>
            <TextField
                label="specific"
                value={specific}
                color="secondary"
                error={isSpecificValid(specific)}
                helperText="กรุณาใส่มูลค่าส่วนลด (ราคา)"
                focused
                onChange={(e) => setSpecific(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : selected === "free" ? (
          <div>
            <h2>ฟรี</h2>
            <TextField
                label="free"
                value={free}
                color="secondary"
                error={isFreeValid(specific)}
                helperText="ขั้นต่ำคำสั่งซื้อ"
                focused
                onChange={(e) => setFree(e.target.value)}
              />
            {renderPromotionDetails()}
          </div>
        ) : null}
        </div>
        </Box>

        <Box style={{ flex: 1 }}>
        <div>
          {selected2 === 'menu' ? (
            <div>
              <h2>เลือกเมนู</h2>
              {renderMenus()}
            </div>
          ): selected2 === 'category' ? (
            <div>
              <h2>เลือกหมวดหมู่</h2>
              หมวดหมู่
            </div>
          ): selected2 === 'amount' ? (
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
  


function Step3() {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

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
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
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
        return <Step1 setSelected={setSelected} selected={selected} setSelected2={setSelected2} selected2={selected2} />;
      case 1:
        return <Step2 selected={selected} selected2={selected2}/>;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

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
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DashboardLayout>
  );
}
