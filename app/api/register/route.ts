import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      age,
      state,
      residence,
      caste,
      is_disabled,
      disability_percentage,
      occupation,
      is_bpl,
      income,              // ✅ NEW
      is_gov_employee,     // ✅ NEW
    } = body;

    await db.query(
      `INSERT INTO users 
  (name, age, state, residence, caste, is_disabled, disability_percentage, occupation, is_bpl, income, is_gov_employee)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    age=VALUES(age),
    state=VALUES(state),
    residence=VALUES(residence),
    caste=VALUES(caste),
    is_disabled=VALUES(is_disabled),
    disability_percentage=VALUES(disability_percentage),
    occupation=VALUES(occupation),
    is_bpl=VALUES(is_bpl),
    income=VALUES(income),
    is_gov_employee=VALUES(is_gov_employee)
`,
      [
        name,
        age,
        state,
        residence,
        caste,
        is_disabled ? 1 : 0,
        disability_percentage,
        occupation,
        is_bpl ? 1 : 0,
        income,
        is_gov_employee ? 1 : 0,
      ]
    );

    return NextResponse.json({ message: "User saved successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}