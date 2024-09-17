#!/usr/bin/python3
from marshmallow import Schema, fields


class NotificationSchema(Schema):
    id = fields.Int(dump_only=True)
    message = fields.Str(required=True)
    user_id = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)

