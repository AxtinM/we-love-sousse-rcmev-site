import { errors } from '@strapi/utils';

const { ValidationError } = errors;

const NEWSLETTER_REQUIRED_FIELDS = ['title', 'numero', 'coverImage', 'link', 'resume'] as const;

type ArticlePayload = {
  title?: unknown;
  numero?: unknown;
  coverImage?: unknown;
  link?: unknown;
  resume?: unknown;
  publicationType?: unknown;
};

const isEmptyValue = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    const relationValue = value as {
      id?: unknown;
      connect?: unknown[];
      set?: unknown[];
    };

    if (relationValue.id) {
      return false;
    }

    if (Array.isArray(relationValue.connect) && relationValue.connect.length > 0) {
      return false;
    }

    if (Array.isArray(relationValue.set) && relationValue.set.length > 0) {
      return false;
    }

    return Object.keys(relationValue).length === 0;
  }

  return false;
};

const validateNewsletterPayload = (data: ArticlePayload) => {
  if (data.publicationType !== 'newsletter') {
    return;
  }

  const missingFields = NEWSLETTER_REQUIRED_FIELDS.filter((field) => isEmptyValue(data[field]));

  if (missingFields.length > 0) {
    throw new ValidationError(
      `For publication type "newsletter", these fields are required: ${missingFields.join(', ')}`
    );
  }
};

const loadCurrentArticle = async (where: Record<string, unknown> | undefined): Promise<ArticlePayload> => {
  if (!where || Object.keys(where).length === 0) {
    return {};
  }

  const article = await strapi.db.query('api::article.article').findOne({
    where,
    select: ['title', 'numero', 'link', 'resume', 'publicationType'],
    populate: {
      coverImage: {
        select: ['id'],
      },
    },
  });

  return (article ?? {}) as ArticlePayload;
};

export default {
  async beforeCreate(event: { params: { data?: ArticlePayload } }) {
    validateNewsletterPayload(event.params.data ?? {});
  },

  async beforeUpdate(event: { params: { data?: ArticlePayload; where?: Record<string, unknown> } }) {
    const currentArticle = await loadCurrentArticle(event.params.where);
    const mergedData: ArticlePayload = {
      ...currentArticle,
      ...(event.params.data ?? {}),
    };

    validateNewsletterPayload(mergedData);
  },
};
