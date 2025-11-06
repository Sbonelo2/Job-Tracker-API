import { Request, Response } from "express";
import * as applicationService from "../service/applicationSerevice";

export const addApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application = await applicationService.createApplication(req.body, req.user!.id);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error in creating application" });
  }
};

export const getAllApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applications = await applicationService.findAllApplications();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching applications" });
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application = await applicationService.findApplicationById(
      Number(req.params.id)
    );
    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching application" });
  }
};

export const updateApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedApplication = await applicationService.updateApplication(
      Number(req.params.id),
      req.body
    );
    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error in updating application" });
  }
};

export const deleteApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await applicationService.deleteApplication(
      Number(req.params.id)
    );
    if (!deleted) {
      res.status(404).json({ message: "Application not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error in deleting application" });
  }
};
