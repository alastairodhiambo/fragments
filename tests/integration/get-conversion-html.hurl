# tests/integration/get-conversion-html.hurl

# 1. Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# user1@email.com:password1
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: text/html
file,index.html;

# 2. We expect to get back an HTTP 201
HTTP/1.1 201
[Asserts]
header "Location" matches "^http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
jsonpath "$.fragment.id" matches "^[A-Za-z0-9_-]+$"
jsonpath "$.fragment.ownerId" matches "^[0-9a-fA-F]+$"
jsonpath "$.fragment.created" isString
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.type" == "text/html"

# Capture the Location URL into a variable named `url`
[Captures]
url: header "Location"

# 3. Try to GET the fragment we just posted by its URL
GET {{url}}.txt
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

# 4. Return 200 and check contents
HTTP/1.1 200
Content-Type: text/plain; charset=utf-8
