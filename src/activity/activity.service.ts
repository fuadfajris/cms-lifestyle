import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from './activity.model';
import { ActivityRequest } from './dto/activity-request.dto';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity)
    private readonly activityModel: typeof Activity,
  ) {}

  async findAllByMerchant(
    merchantId: number,
    page: number = 1,
    perPage: number = 10,
  ): Promise<{
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    data: Activity[];
  }> {
    // hitung total activity merchant
    const total = await this.activityModel.count({
      where: { merchant_id: merchantId },
    });

    // hitung offset
    const offset = (page - 1) * perPage;

    // ambil data activity dengan limit & offset
    const data = await this.activityModel.findAll({
      where: { merchant_id: merchantId },
      order: [['id', 'DESC']],
      limit: perPage,
      offset,
    });

    // hitung total pages
    const totalPages = Math.ceil(total / perPage);

    return {
      total,
      page,
      perPage,
      totalPages,
      data,
    };
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityModel.findByPk(id);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return activity;
  }

  async create(payload: ActivityRequest): Promise<Activity> {
    const { content_key, content_name, prevValue, newValue, maker } = payload;

    const merchant_id = maker?.merchant_id;

    if (!merchant_id) {
      throw new Error('merchant_id is required');
    }

    const content = JSON.stringify({
      prevValue: prevValue || null,
      newValue: newValue || null,
    });

    const activity = await this.activityModel.create({
      merchant_id,
      content_key,
      content_name,
      content,
      maker: JSON.stringify(maker),
      approver: null,
      status: 'pending',
      created_at: new Date(),
      updated_at: undefined,
    });

    return activity;
  }

  async update(
    id: number,
    approver: {
      id: number;
      name: string;
      email?: string;
      role: string;
      merchant_id: number;
    },
    status: 'approved' | 'rejected',
  ): Promise<Activity> {
    // 1️⃣ ambil activity
    const activity = await this.activityModel.findByPk(id);

    if (!activity) {
      throw new Error('Activity not found');
    }

    // 2️⃣ cek merchant_id sama
    if (activity.dataValues.merchant_id !== approver.merchant_id) {
      throw new Error(
        'You are not authorized to update this activity (merchant mismatch)',
      );
    }

    // 3️⃣ cek role Approver
    if (approver.role.toLowerCase() !== 'approver') {
      throw new Error('You are not authorized to approve/reject this activity');
    }

    // 4️⃣ update status & approver
    await activity.update({
      status,
      approver: JSON.stringify(approver),
      updated_at: new Date(),
    });

    return activity;
  }

  async delete(id: number): Promise<{ message: string }> {
    const activity = await this.findOne(id);
    await activity.destroy();
    return { message: 'Activity deleted successfully' };
  }

  async checkPending(
    id: string,
    merchantId: string,
    contentKey: string,
  ): Promise<boolean> {
    const contentId = parseInt(id);
    const merchantIdNum = parseInt(merchantId);

    // 1️⃣ Ambil semua activity dengan merchant_id dan content_key yang sesuai
    const activities = await this.activityModel.findAll({
      where: {
        merchant_id: merchantIdNum,
        content_key: contentKey,
      },
    });

    // 2️⃣ Cek satu per satu konten JSON-nya
    for (const activity of activities) {
      const content =
        typeof activity.dataValues.content === 'string'
          ? JSON.parse(activity.dataValues.content)
          : activity.dataValues.content;

      const prevId = content?.prevValue?.id
        ? parseInt(content.prevValue.id)
        : null;
      const newId = content?.newValue?.id
        ? parseInt(content.newValue.id)
        : null;

      if (
        (prevId === contentId || newId === contentId) &&
        activity.dataValues.status?.toLowerCase() === 'pending'
      ) {
        return true;
      }
    }

    return false;
  }
}
