import type { Schema, Struct } from '@strapi/strapi';

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    description: '';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedImpactStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_impact_stats';
  info: {
    description: 'A statistic showing project impact';
    displayName: 'Impact Stat';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPhone extends Struct.ComponentSchema {
  collectionName: 'components_shared_phones';
  info: {
    description: '';
    displayName: 'Phone';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProjectGoal extends Struct.ComponentSchema {
  collectionName: 'components_shared_project_goals';
  info: {
    description: 'A project goal or objective';
    displayName: 'Project Goal';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedRegion extends Struct.ComponentSchema {
  collectionName: 'components_shared_regions';
  info: {
    description: 'A target region for project activities';
    displayName: 'Region';
  };
  attributes: {
    beneficiaries: Schema.Attribute.Integer;
    coordinates: Schema.Attribute.String;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '';
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    description: 'A timeline event or milestone';
    displayName: 'Timeline Item';
  };
  attributes: {
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.seo': SeoSeo;
      'shared.impact-stat': SharedImpactStat;
      'shared.phone': SharedPhone;
      'shared.project-goal': SharedProjectGoal;
      'shared.region': SharedRegion;
      'shared.social-link': SharedSocialLink;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}
