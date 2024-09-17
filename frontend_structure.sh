#!/bin/bash

# Base directory
base_dir="front"

# Create frontend directory structure
mkdir -p $base_dir/src/{assets,components/{Auth,Dashboard,Incidents,Notifications,Settings,Help},contexts,hooks,pages,services}

# Create frontend files

touch $base_dir/src/components/Auth/{Login.js,Register.js}
touch $base_dir/src/components/Dashboard/{AdminDashboard.js,UserDashboard.js}
touch $base_dir/src/components/Incidents/{IncidentList.js,ReportIncident.js}
touch $base_dir/src/components/Notifications/NotificationList.js
touch $base_dir/src/components/Settings/Settings.js
touch $base_dir/src/components/Help/{Faqs.js,Contact.js}
touch $base_dir/src/routes.js
touch $base_dir/src/services/api.js
