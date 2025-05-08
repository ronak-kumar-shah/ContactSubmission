import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CONTACTS_API } from "../api/constants";

interface Contact {
  name: string;
  email: string;
  phone: string;
}

const ContactForm: React.FC = () => {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  //const [snackbarOpen, setSnackbarOpen] = useState(false);
  //const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      console.log("CONTACTS_API.GET_ALL::", CONTACTS_API.GET_ALL);
      const res = await fetch(CONTACTS_API.GET_ALL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove all invalid characters: allow digits and only one + at the start
    input = input.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, "");

    // Update state
    setContact((prev) => ({ ...prev, phone: input }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!contact.name.trim()) {
      newErrors.name =
        "Name is required, maximum length allowed is 30 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email.trim()) {
      newErrors.email =
        "Email is required, maximum length allowed is 40 characters";
    } else if (!emailRegex.test(contact.email)) {
      newErrors.email = "Enter a valid email";
    }

    const phoneRegex = /^\+?[0-9]{7,14}$/;

    if (!contact.phone.trim()) {
      newErrors.phone =
        "Phone is required, must be 7-15 digits long (with optional +)";
    } else if (!phoneRegex.test(contact.phone)) {
      newErrors.phone =
        "Enter a valid phone number (digits only, optional leading +)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Updated handleSubmit with retry logic (max 3 attempts)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // proceed with API submission
    const maxRetries = 3;
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      attempts++;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // timeout after 3 sec

      try {
        // const res = await fetch(
        //   "http://localhost:5203/api/contacts/CreateContact",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(contact),
        //     signal: controller.signal,
        //   }
        // );
        console.log("CONTACTS_API.CREATE::", CONTACTS_API.CREATE);
        const res = await fetch(CONTACTS_API.CREATE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (res.ok) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Contact submitted successfully!");
          setSnackbarOpen(true);
          setContact({ name: "", email: "", phone: "" });
          fetchContacts();
          success = true;
          break;
        } else {
          throw new Error("Submission failed");
        }
      } catch (err: any) {
        clearTimeout(timeout);

        if (attempts < maxRetries) {
          setSnackbarSeverity("warning");
          setSnackbarMessage(
            `Attempt ${attempts} failed. API service may be down. Retrying...`
          );
          setSnackbarOpen(true);
          await new Promise((res) => setTimeout(res, 1500)); // delay before retry
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(
            `All ${maxRetries} attempts failed. Please try again later.`
          );
          setSnackbarOpen(true);
        }
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Submit Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          onBlur={validate}
          error={!!errors.name}
          helperText={errors.name}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-error fieldset": { borderColor: "red" },
              "&.Mui-focused:not(.Mui-error) fieldset": {
                borderColor: "green",
              },
            },
          }}
          InputProps={{
            inputProps: { maxLength: 30 }, // Max length for Name
            endAdornment:
              !errors.name && contact.name.trim() !== "" ? (
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
              ) : null,
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          onBlur={validate}
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-error fieldset": { borderColor: "red" },
              "&.Mui-focused:not(.Mui-error) fieldset": {
                borderColor: "green",
              },
            },
          }}
          InputProps={{
            inputProps: { maxLength: 40 }, // Max length for email
            endAdornment:
              !errors.email && contact.email.trim() !== "" ? (
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
              ) : null,
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={contact.phone}
          onChange={handlePhoneChange} // use custom handler
          onBlur={validate}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-error fieldset": { borderColor: "red" },
              "&.Mui-focused:not(.Mui-error) fieldset": {
                borderColor: "green",
              },
            },
          }}
          InputProps={{
            inputProps: { maxLength: 15 }, // Max length for phone number
            endAdornment:
              !errors.phone && contact.phone.trim() !== "" ? (
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
              ) : null,
          }}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Stored Contacts ({contacts.length})
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((c, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "grey.100" : "white",
                    "&:hover": { backgroundColor: "grey.200" },
                  }}
                >
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default ContactForm;
