import os
import yaml
from django.apps import apps

def load_schema():
    final_schema = {
        "openapi": "3.0.3",
        "info": {
            "title": "Appointments API",
            "description": "API para gestión de citas",
            "version": "1.0.0",
        },
        "servers": [
            {
                "url": "/api/v1",
                "description": "Base API prefix"
            }
        ],
        "paths": {},
        "components": {},
    }

    for app_config in apps.get_app_configs():
        app_path = app_config.path 

        if ".venv" in app_path:
            continue

        docs_path = os.path.join(app_path, "docs.yaml")

        if os.path.exists(docs_path):
            with open(docs_path, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f)

                # merge paths
                final_schema["paths"].update(data.get("paths", {}))

                # merge components
                if "components" in data:
                    for key, value in data["components"].items():
                        if key not in final_schema["components"]:
                            final_schema["components"][key] = {}
                        final_schema["components"][key].update(value)

    return final_schema