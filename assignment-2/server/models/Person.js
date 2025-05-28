import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be a positive number']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Simple validation for phone numbers
        return /^\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  }
}, {
  timestamps: true
});

const Person = mongoose.model('Person', personSchema);

export default Person;