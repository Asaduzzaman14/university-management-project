import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepertment } from '../academicDepartment/academicDepartment.Interface';
import { IAcademicSemister } from '../academicSemester/academicSemester.Interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  address: string;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepertment;
  academicSemester: Types.ObjectId | IAcademicSemister;
  profileImage?: string;
};

export type StudentModal = Model<IStudent, Record<string, unknown>>;

export type IStudentsFilters = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  contaceNo?: string;
  emergencyContactNo?: string;
};
