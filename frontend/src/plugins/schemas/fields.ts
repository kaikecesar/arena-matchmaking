// Libraries
import { z } from 'zod'

/* *************************************************************************************************
*************************************** STRING FIELD BUILDERS **************************************
************************************************************************************************* */
const requiredString = (message: string): z.ZodString =>
  z.string().min(1, { message })

const emailString = (
  emptyMessage: string,
  invalidMessage: string
): z.ZodString =>
  z.string().min(1, { message: emptyMessage }).email({ message: invalidMessage })

const minLengthString = (min: number, message: string): z.ZodString =>
  z.string().min(min, { message })

export { emailString, minLengthString, requiredString }
