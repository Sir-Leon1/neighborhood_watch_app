#!/usr/bin/python3
from marshmallow import Schema, fields


class SettingsSchema(Schema):
    id = fields.Int(dump_only=True)
    key = fields.Str(required=True)
    value = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
