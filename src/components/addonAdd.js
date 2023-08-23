import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Card, CardContent} from '@mui/material';
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import Grid from '@mui/material/Grid';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function AddonAdd(){
    const [value, setValue] = useState(0);
    const [image, setImage] = useState(null);
    const [editAmount, setEditAmount] = useState(0);
    const initial = useRef(false);
    const [id, setId] = useState(0);
    const [addons, setAddons] = useState([]);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('กรุณาใส่ชื่อสินค้า'),
      price: Yup.number().positive('กรุณาใส่ราคาที่มากกว่า 0').required('กรุณาใส่ราคา'),
      amount: Yup.number().positive('กรุณาใส่จำนวนที่มากกว่า 0').required('กรุณาใส่จำนวน'),
      unit: Yup.string().required('กรุณาใส่หน่วย'),
    });
  
    const formik = useFormik({
      initialValues: {
        name:'',
        price:'',
        amount:'',
        unit:'',
      },
      validationSchema,
      onSubmit: async (values) => {
        if (!image) {
          Swal.fire("Error", "กรุณาใส่รูปภาพ", "error");
          return;
        }

        Swal.fire({
          title: "ต้องการเพิ่มเมนูเพิ่มเติมนี้หรือไม่",
          confirmButtonText: "ยืนยัน",
          showDenyButton: true,
          denyButtonText: "ยกเลิก", 
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire(`เพิ่มเมนูเพิ่มเติมชิ้นนี้แล้ว`, "", "success");
            try {
              const response = await fetch('http://localhost:5000/addons', {
                method: 'POST',
                body: JSON.stringify({
                  id: id+1,
                  name: values.name,
                  thumbnail: image,
                  price: values.price,
                  amount: values.amount,
                  editAmount: editAmount,
                  unit: values.unit,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error('Failed to add new addon');
              }
              const resJson = await response.json();
              console.log(resJson);
              setImage(null);
              fetchAddons();
              formik.resetForm();
              document.getElementById('file-input').value = '';
            } catch (error) {
              console.log('Error:', error.message);
            }
          }})
      }
    })

    
      function handleChangeFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (!file) {
          return;
        }
      
        reader.onloadend = () => {
          const base64String = reader.result;
          setImage(base64String);
        };
      
        reader.readAsDataURL(file);
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const fetchAddons = async () => {
        try {
          const res = await fetch('http://localhost:5000/addons');
          const data = await res.json();
          setAddons(data);
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
        fetchAddons();
      }, [id]);

    return(
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex' ,marginTop: {
          xs: '60px',sm: '70px',md: '80px',lg: '90px',xl: '100px', }}}>
        <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Box sx={{ m: 1 }}>
          <label htmlFor="upload-photo">
                {image ? (
                  <img
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                    src={image}
                    alt="Preview"
                    variant="square"
                    width="600px"
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      color: '#DCD9D8', 
                      width: "400px",
                      cursor: 'pointer',
                    }}
                  />
                )}
              </label>
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={handleChangeFile}
                accept="image/*"
              />
          </Box>
        </Grid>

          <Grid container
            justifyContent="space-evenly"
            alignItems="flex-start"  
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Box
            sx={{ '& > :not(style)': { m: 3 } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              focused
              fullWidth
              label="ชื่อสินค้า"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br/>
            <TextField
              focused
              label="ราคา"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.touched.price && !!formik.errors.price}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              focused
              label="หน่วย"
              name="unit"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.unit}
              error={formik.touched.unit && !!formik.errors.unit}
              helperText={formik.touched.unit && formik.errors.unit}
            />
            <br/>
            <TextField
              focused
              label="จำนวน"
              name="amount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.amount}
              error={formik.touched.amount && !!formik.errors.amount}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <TextField
              label="แก้ไขจำนวน"
              disabled
              value={editAmount}
              color="secondary"
              focused
              onChange={(e) => setEditAmount(e.target.value)}
            />
          <br/>

          <Button fullWidth variant="contained" type="submit">สร้างเมนูเพิ่มเติมใหม่</Button>
          </Box>
          </Grid>
        </Box>
        </form>
    )
}

export default AddonAdd;