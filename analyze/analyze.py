from matplotlib import pyplot as plt
import numpy as np
import csv
import matplotlib.gridspec as gridspec
from matplotlib.pyplot import MultipleLocator

# 開啟 CSV 檔案
with open(r"MicroHeat_z.csv", newline='',encoding="utf-8-sig") as csvfile:
  # 讀取 CSV 檔案內容
  rows = csv.reader(csvfile)
  line = []
  # 以迴圈輸出每一列
  for row in rows:
    line.append(row)
  
loo=[]
looo=[]

for a in range(len(line)):  
    ll = float(line[a][0])
    loo.append(ll)
    looo.append((line[a][1]))


# 實時繪製橫縱軸變量
x = []
y = []
x1 = []
y1 = []
x2 = []
y2 = []
ims = []

# 創建窗口
plt.ion()
fig = plt.figure(figsize=(8, 10))
gs = gridspec.GridSpec(3,3)

# 创建循环

for i in range(len(line)):

    ax1 = plt.subplot(gs[0, :]) 

    # The X-axis:time  The Y-axis:For calculation
    # The X-axis:time  The Y-axis:Z
    
    plt.title("The X-axis:time  The Y-axis:Z", fontsize=10, color='red')
    ax1.set_xticklabels([])#消除x座標值
    ax1.set_xticks([])#消除x座標刻度
    
    
    y_major_locator = MultipleLocator(0.05)
    ax1.yaxis.set_major_locator(y_major_locator)
    
    # plt.ylim(-0.15, 0.1)
    plt.ylim(-0.1, 0.05)

    x.append((looo[i]))	# 添加i到x轴的數據中
    y.append((loo[i]))	# 添加i到y轴的數據中
    ax1.plot(x, y, color='blue', linestyle='-')  # 繪出當前x列表和y列表中的值的



    ax2 = plt.subplot(gs[1, :]) 
    plt.title("The X-axis:time  The Y-axis:Z", fontsize=10, color='blue')
    ax2.set_xticklabels([])#消除x座標值
    ax2.set_xticks([])#消除x座標刻度
    
    
    y_major_locator = MultipleLocator(0.05)
    ax2.yaxis.set_major_locator(y_major_locator)
    
    # plt.ylim(-0.15, 0.1)
    plt.ylim(-0.1, 0.05)

    x.append((looo[i]))	# 添加i到x轴的數據中
    y.append((loo[i]))	# 添加i到y轴的數據中
    ax2.plot(x, y, color='blue', linestyle='-')  # 繪出當前x列表和y列表中的值的

    plt.pause(0.01)  # 每0.0083秒跑出一筆數據
    # plt.show()
    # plt.clf() #刪除舊有內存資料
    




