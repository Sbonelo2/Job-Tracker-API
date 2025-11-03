import { Request, Response } from 'express';
import * as applicatuionService from '../service/applicationSerevice';

export const addApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const application = await applicatuionService.createApplication(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Error in creating application" });

    }
};