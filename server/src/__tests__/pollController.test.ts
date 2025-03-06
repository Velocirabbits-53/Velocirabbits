import { Request, Response, NextFunction } from 'express';
import { pollController } from '../controllers/pollController';
import { Poll } from '../models/users';
import crypto from 'crypto';

jest.mock('../models/users');
jest.mock('crypto');

describe('pollController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('dashboardVoteNow', () => {
    it('should call next if poll exists', async () => {
      req.body = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockResolvedValue({});

      await pollController.dashboardVoteNow(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 if poll does not exist', async () => {
      req.body = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockResolvedValue(null);

      await pollController.dashboardVoteNow(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "code doesn't exist in database" });
    });

    it('should handle errors', async () => {
      req.body = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockRejectedValue(new Error('Test error'));

      await pollController.dashboardVoteNow(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        log: 'You are receiving an error from the pollController.dashboardVoteNow',
        status: 500,
        message: { err: 'This is a 500 error message' },
      });
    });
  });

  describe('createPoll', () => {
    beforeEach(() => {
      req.body = { pollName: 'testPoll', pollTopics: [{}], createdBy: 'testUser' };
      (crypto.randomBytes as jest.Mock).mockReturnValue(Buffer.from('testCode'));
    });
  
    it('should create a poll and call next', async () => {
      // Mock Poll.findOne to return null, indicating no existing poll with the generated code
      (Poll.findOne as jest.Mock).mockResolvedValue(null);
      // Mock Poll.create to resolve successfully
      (Poll.create as jest.Mock).mockResolvedValue({});
  
      await pollController.createPoll(req as Request, res as Response, next);
  
      // Check that Poll.create was called with the correct arguments
      expect(Poll.create).toHaveBeenCalledWith({
        pollName: 'testPoll',
        pollTopics: [{ votes: 0 }],
        code: Buffer.from('testCode').toString('hex').toUpperCase(), // Convert to hex and uppercase
        createdBy: 'testUser',
      });
      // Check that res.locals.code was set correctly
      expect(res.locals.code).toBe(Buffer.from('testCode').toString('hex').toUpperCase());
      // Check that next was called
      expect(next).toHaveBeenCalled();
    });
  
    it('should handle errors when creating a poll', async () => {
      // Mock Poll.findOne to throw an error
      (Poll.findOne as jest.Mock).mockRejectedValue(new Error('Test error'));
  
      await pollController.createPoll(req as Request, res as Response, next);
  
      // Check that next was called with the correct error object
      expect(next).toHaveBeenCalledWith({
        log: 'You are receiving an error from the pollController.createPoll',
        status: 500,
        message: { err: 'This is a 500 error message' },
      });
    });
  });

  describe('pastPolls', () => {
    it('should get past polls and call next', async () => {
      req.params = { username: 'testUser' };
      (Poll.find as jest.Mock).mockResolvedValue(['poll1', 'poll2']);

      await pollController.pastPolls(req as Request, res as Response, next);

      expect(Poll.find).toHaveBeenCalledWith({ createdBy: 'testUser' });
      expect(res.locals.polls).toEqual(['poll1', 'poll2']);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('votingPage', () => {
    it('should get poll and call next', async () => {
      req.params = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockResolvedValue({});

      await pollController.votingPage(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(res.locals.poll).toEqual({});
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 if poll does not exist', async () => {
      req.params = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockResolvedValue(null);

      await pollController.votingPage(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Code' });
    });

    it('should handle errors', async () => {
      req.params = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockRejectedValue(new Error('Test error'));

      await pollController.votingPage(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        log: 'You are receiving an error from the pollController.votingPage',
        status: 500,
        message: { err: 'This is a 500 error message' },
      });
    });
  });

  describe('updatedVotes', () => {
    it('should update votes and call next', async () => {
      req.body = { code: 'testCode', votes: [1, 2] };
      const poll = { pollTopics: [{ votes: 1 }, { votes: 2 }] };
      (Poll.findOne as jest.Mock).mockResolvedValue(poll);
      (Poll.findOneAndUpdate as jest.Mock).mockResolvedValue({});

      await pollController.updatedVotes(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(Poll.findOneAndUpdate).toHaveBeenCalledWith(
        { code: 'testCode' },
        [{ votes: 2 }, { votes: 4 }]
      );
      expect(next).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      req.body = { code: 'testCode', votes: [1, 2] };
      (Poll.findOne as jest.Mock).mockRejectedValue(new Error('Test error'));

      await pollController.updatedVotes(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        log: 'Error finding poll in pollController.updatedVotes',
        status: 500,
        message: { err: 'This is a 500 error message' },
      });
    });
  });

  describe('getResults', () => {
    it('should get poll results and call next', async () => {
      req.params = { code: 'testCode' };
      (Poll.findOne as jest.Mock).mockResolvedValue('pollData');

      await pollController.getResults(req as Request, res as Response, next);

      expect(Poll.findOne).toHaveBeenCalledWith({ code: 'testCode' });
      expect(res.locals.data).toBe('pollData');
      expect(next).toHaveBeenCalled();
    });
  });
});