import { query } from "../config/database";
import { Application, NewApplication } from "../types/application.types";

export const createApplication = async (
  application: NewApplication
): Promise<Application> => {
  const { company_name, job_tittle, status } = application;
  const { rows } = await query(
    "INSERT INTO applications (company_name, job_tittle, status) VALUES ($1, $2, $3) RETURNING *",
    [company_name, job_tittle, status]
  );
  return rows[0];
};

export const findAllApplications = async (): Promise<Application[]> => {
  const { rows } = await query(
    "SELECT * FROM applications ORDER BY applied_at DESC"
  );
  return rows;
};

export const findApplicationById = async (
  id: number
): Promise<Application | null> => {
  const { rows } = await query("SELECT * FROM applications WHERE id = $1", [
    id,
  ]);
  return rows[0] || null;
};

export const updateApplication = async (
  id: number,
  application: Partial<NewApplication>
): Promise<Application | null> => {
  const { company_name, job_tittle, status } = application;
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramCounter = 1;

  if (company_name) {
    updateFields.push(`company_name = $${paramCounter}`);
    values.push(company_name);
    paramCounter++;
  }
  if (job_tittle) {
    updateFields.push(`job_tittle = $${paramCounter}`);
    values.push(job_tittle);
    paramCounter++;
  }
  if (status) {
    updateFields.push(`status = $${paramCounter}`);
    values.push(status);
    paramCounter++;
  }

  if (updateFields.length === 0) return null;

  values.push(id);
  const { rows } = await query(
    `UPDATE applications SET ${updateFields.join(
      ", "
    )} WHERE id = $${paramCounter} RETURNING *`,
    values
  );
  return rows[0] || null;
};

export const deleteApplication = async (id: number): Promise<boolean> => {
  const result = await query("DELETE FROM applications WHERE id = $1", [id]);
  return result.rowCount ? result.rowCount > 0 : false;
};
