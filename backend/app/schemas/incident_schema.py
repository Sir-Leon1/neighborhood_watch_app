from marshmallow import Schema, fields


class IncidentSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    location = fields.Str(required=True)
    status = fields.Str(dump_only=True)
    user_id = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


incident_schema = IncidentSchema()
incidents_schema = IncidentSchema(many=True)

