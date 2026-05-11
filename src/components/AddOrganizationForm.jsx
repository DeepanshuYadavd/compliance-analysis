import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper, 
  Divider,
  CircularProgress,
  InputAdornment,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Business, 
  ContactPage, 
  LocationOn, 
  Security,
  Language,
  Phone,
  Email,
  Badge,
  CheckCircle,
  VpnKey,
  Description
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../api/api';

import styles from './AddOrganizationForm.module.css';

const AddOrganizationForm = ({ onSuccess }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isDark = theme.palette.mode === 'dark';
  
  const [formData, setFormData] = useState({
    legalName: '',
    dbaName: '',
    website: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    primaryContact: {
      name: '',
      email: ''
    },
    identifiers: {
      fdafei: '',
      labellerCode: '',
      dunsNumber: '',
      cin: '',
      gstin: '',
      pan: '',
      cdsco: '',
      others: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/organization/create', formData);
      toast.success('Organization registered successfully!');
      
      setFormData({
        legalName: '',
        dbaName: '',
        website: '',
        phoneNumber: '',
        address: { street: '', city: '', state: '', zip: '', country: '' },
        primaryContact: { name: '', email: '' },
        identifiers: { fdafei: '', labellerCode: '', dunsNumber: '', cin: '', gstin: '', pan: '', cdsco: '', others: '' }
      });

      if (onSuccess) onSuccess(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to register organization');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: alpha(theme.palette.background.paper, 0.5),
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.formContainer}>
      <Paper className={`${styles.paper} ${isDark ? styles.darkPaper : styles.lightPaper}`}>
        <Box className={styles.headerBox}>
          <Typography variant="h4" className={styles.title}>
            Register New Organization
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provide comprehensive details to establish your business profile in the compliance engine.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Section 1: Basic Information */}
          <Grid item xs={12}>
            <Box className={styles.sectionHeader}>
              <Business /> Basic Information
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Legal Name"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  sx={inputStyle}
                  placeholder="e.g. Acme Corporation Inc."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="DBA Name"
                  name="dbaName"
                  value={formData.dbaName}
                  onChange={handleChange}
                  sx={inputStyle}
                  placeholder="Doing Business As..."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website URL"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  sx={inputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="https://www.example.com"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  sx={inputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="+1 (555) 000-0000"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}><Divider className={styles.divider} /></Grid>

          {/* Section 2: Address Details */}
          <Grid item xs={12} md={6}>
            <Box className={styles.sectionHeader}>
              <LocationOn /> Registered Address
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="street"
                  value={formData.address.street}
                  onChange={(e) => handleNestedChange(e, 'address')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleNestedChange(e, 'address')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State / Province"
                  name="state"
                  value={formData.address.state}
                  onChange={(e) => handleNestedChange(e, 'address')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ZIP / Postal Code"
                  name="zip"
                  value={formData.address.zip}
                  onChange={(e) => handleNestedChange(e, 'address')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.address.country}
                  onChange={(e) => handleNestedChange(e, 'address')}
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Section 3: Primary Contact */}
          <Grid item xs={12} md={6}>
            <Box className={styles.sectionHeader}>
              <ContactPage /> Primary Contact
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  name="name"
                  value={formData.primaryContact.name}
                  onChange={(e) => handleNestedChange(e, 'primaryContact')}
                  sx={inputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  name="email"
                  type="email"
                  value={formData.primaryContact.email}
                  onChange={(e) => handleNestedChange(e, 'primaryContact')}
                  sx={inputStyle}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}><Divider className={styles.divider} /></Grid>

          {/* Section 4: Regulatory Identifiers */}
          <Grid item xs={12}>
            <Box className={styles.sectionHeader}>
              <Security /> Regulatory & Corporate Identifiers
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="FDA FEI"
                  name="fdafei"
                  value={formData.identifiers.fdafei}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                  placeholder="FDA Establishment ID"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Labeller Code"
                  name="labellerCode"
                  value={formData.identifiers.labellerCode}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="DUNS Number"
                  name="dunsNumber"
                  value={formData.identifiers.dunsNumber}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="CIN"
                  name="cin"
                  value={formData.identifiers.cin}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                  helperText="Corporate Identification Number"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="GSTIN"
                  name="gstin"
                  value={formData.identifiers.gstin}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="PAN"
                  name="pan"
                  value={formData.identifiers.pan}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="CDSCO"
                  name="cdsco"
                  value={formData.identifiers.cdsco}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Other Identifiers"
                  name="others"
                  value={formData.identifiers.others}
                  onChange={(e) => handleNestedChange(e, 'identifiers')}
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register Organization'}
            </button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddOrganizationForm;
