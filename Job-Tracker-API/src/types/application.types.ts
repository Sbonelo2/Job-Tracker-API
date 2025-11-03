export type Applicationstatus = "Applied" | "pending" | "Rejected" | "offer";

export interface Application {
    id: number;
    company_name: string;
    job_tittle: string;
    status: Applicationstatus;
    applied_at: Date
}

export type NewApplication = Omit<Application, 'id' | 'applied_at'>

export type UpdateApplication = Pick<Application, "status">;