import { NextResponse } from "next/server";

export const genericRes = (
  message: string,
  status: number,
  isSuccess = false
) => {
  return NextResponse.json(
    { success: isSuccess, message: message },
    { status: status }
  );
};
