import bcrypt


def hash_password(password: str) -> str:
    """"""
    pwd_bytes = password.encode() if isinstance(password, str) else password
    hashed_pwd = bcrypt.hashpw(pwd_bytes, bcrypt.gensalt(15))
    return hashed_pwd.decode()


def verify_password(password, hashed) -> bool:
    """"""
    return bcrypt.checkpw(password, hashed)
