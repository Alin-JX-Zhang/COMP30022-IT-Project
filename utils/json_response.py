import json

from django.http import JsonResponse as HttpResponse


# Generic json response class
class JsonResponse():
    def __init__(self, status_code, message, data):
        self.status_code = status_code
        self.message = message
        self.data = data

    # generic response
    @classmethod
    def success(cls, message, data):
        return HttpResponse(cls(200, message, data).to_dict(), safe=False)

    # Generic Error Response
    @classmethod
    def error(cls, message):
        return HttpResponse(cls(500, message, None).to_dict(), safe=False)

    # Not logged in error response
    @classmethod
    def not_login(cls):
        return HttpResponse(cls(401, "Not logged in", None).to_dict(), safe=False)

    # Unauthorized error response
    @classmethod
    def not_permission(cls):
        return HttpResponse(cls(403, "No permission", None).to_dict(), safe=False)

    def to_dict(self):
        # 返回的内容就是一个字典转化为的json字符串
        return {
            # 200代表成功，500代表失败，401代表未登录，403代表无权限
            "status_code": self.status_code,
            # 消息
            "message": self.message,
            # 数据
            "data": self.data
        }
