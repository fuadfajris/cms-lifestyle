import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.model';
import { ActivityRequest } from './dto/activity-request.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('check-pending')
  async checkPending(
    @Query('id') id: string,
    @Query('merchantId') merchantId: string,
    @Query('contentKey') contentKey: string, // contoh: "event,lineup"
  ) {
    if (!id || !merchantId || !contentKey) {
      return { message: 'Missing required query parameters' };
    }

    const pending = await this.activityService.checkPending(
      id,
      merchantId,
      contentKey,
    );

    return { pending };
  }

  @Get()
  async getAll(
    @Query('merchantId', ParseIntPipe) merchantId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('perPage', ParseIntPipe) perPage = 10,
  ): Promise<{
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    data: Activity[];
  }> {
    return this.activityService.findAllByMerchant(merchantId, page, perPage);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Post()
  async create(@Body() body: ActivityRequest): Promise<Activity> {
    return this.activityService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      status: 'approved' | 'rejected';
      approver: {
        id: number;
        name: string;
        email?: string;
        role: string;
        merchant_id: number;
      };
    },
  ): Promise<Activity> {
    return this.activityService.update(id, body.approver, body.status);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.delete(id);
  }
}
