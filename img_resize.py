import os
from PIL import Image

# 입력 폴더 경로 (이미지들이 있는 곳)
input_folder = "input_img"

# 출력 폴더 경로
resize_folder = "resize_img"
crop_folder = "crop_img"

# 폴더 없으면 생성
os.makedirs(resize_folder, exist_ok=True)
os.makedirs(crop_folder, exist_ok=True)

# 리사이즈 비율 (예: 50% 줄이기)
resize_ratio = 0.5

def resize_image(img, save_path):
    w, h = img.size
    new_size = (int(w * resize_ratio), int(h * resize_ratio))
    resized = img.resize(new_size, Image.ANTIALIAS)
    resized.save(save_path)

def crop_square(img, save_path):
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    right = left + min_dim
    bottom = top + min_dim
    cropped = img.crop((left, top, right, bottom))
    cropped.save(save_path)

# 이미지 파일 처리
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # 리사이즈 저장
        resize_path = os.path.join(resize_folder, filename)
        resize_image(img, resize_path)

        # 크롭 저장
        crop_path = os.path.join(crop_folder, filename)
        crop_square(img, crop_path)

print("✅ 모든 이미지 리사이즈 및 크롭 완료!")
