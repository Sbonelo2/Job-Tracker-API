import { query } from '../config/database'
import { Application, NewApplication } from '../types/application.types'

export const createApplication = async (application: NewApplication): Promise<Application> => {
    const { company_name, job_tittle, status } = application
    const { rows } = await query("INSERT INTO applications (company_name, job_tittle, status) VALUES ($1, $2, $3) RETURNING *", [company_name, job_tittle, status]
    );
    return rows[0];
};

export const findAllApplications = async (): Promise<Application[]> => {
    const { rows } = await query(
        "SELECT * FROM applications ORDER BY applied_at DESC"
    );
    return rows;
};

export const findApplicationById = async (id: number): Promise<Application | null> => {
    const { rows } = await query("SELECT * FROM applications WHERE id = $1", [id]);
    return rows[0] || null;
}