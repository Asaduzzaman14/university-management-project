import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesteValidation } from './academicSemister.validation';
import { AcademicSemesterContriller } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesteValidation.createAcademicSemesterZodSchema),
  AcademicSemesterContriller.createSemester
);

export const SemesterRoutes = router;