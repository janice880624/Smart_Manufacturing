from matplotlib import pyplot as plt
import numpy as np
import csv
import time
import matplotlib.gridspec as gridspec
from matplotlib.pyplot import MultipleLocator
# def sleep_time(hour, min, sec):
#     return hour * 3600 + min * 60 + sec

# 開啟 CSV 檔案
with open(r"analyze\ntnu.csv", newline='',encoding="utf-8-sig") as csvfile:
  # 讀取 CSV 檔案內容
  rows = csv.reader(csvfile)
  
  line = []
  # 以迴圈輸出每一列
  for row in rows:
    line.append(row)
  
loo=[]
looo=[]


for a in range(len(line)):
    
    ll=float(line[a][0])
    loo.append(ll)
    looo.append((line[a][1]))
W

# 實時繪製橫縱軸變量
x = []
y = []
x1 = []
y1 = []
x2 = []
y2 = []


# 創建窗口
plt.ion()
plt.figure(figsize=(8,10))
gs = gridspec.GridSpec(3,3)

# 创建循环



for i in range(len(line)):
    #gx(上下坡)
    # ax1.ylim(-1.5,0)
    # y_major_locator=MultipleLocator(0.05)
    # ax1.yaxis.set_major_locator(y_major_locator)
    #每分鐘標註線(計算方法為每秒數據量*60)
    #------------------------------------------------------------
    # ax1.vlines(7200,-20,20,'grey',linestyle = '--')
    # ax1.vlines(14400,-20,20,'grey',linestyle = '--')
    # ax1.vlines(21600,-20,20,'grey',linestyle = '--')
    # ax1.vlines(28800,-20,20,'grey',linestyle = '--')
    # ax1.vlines(36000,-20,20,'grey',linestyle = '--')
    # ax1.vlines(43200,-20,20,'grey',linestyle = '--')
    #------------------------------------------------------------
    ax1 = plt.subplot(gs[0, :]) 
    
    plt.title("The X-axis:time  The Y-axis:For calculation", fontsize=10,color='red')
    ax1.set_xticklabels([])#消除x座標值
    ax1.set_xticks([])#消除x座標刻度
    
    
    y_major_locator=MultipleLocator(0.5)
    ax1.yaxis.set_major_locator(y_major_locator)
    
    plt.ylim(0.0,2)

    x.append((looo[i]))	# 添加i到x轴的數據中
    y.append((loo[i]))	# 添加i到y轴的數據中
    ax1.plot(x, y, color='blue',linestyle = '-')  # 繪出當前x列表和y列表中的值的圖
    
    
    #gz(左右轉)
    # ax2 = plt.subplot(gs[1, :])
    # ax2.set_ylabel('Gravitational acceleration(m/s^2)')
    # plt.title('right or left', fontsize=10,color='red')
    
    # ax2.set_xticklabels([])#消除x座標值
    # ax2.set_xticks([])#消除x座標刻度
    
    # #每分鐘標註線(計算方法為每秒數據量*60)
    # #------------------------------------------------------------
    # # ax2.vlines(7200,-20,20,'grey',linestyle = '--')
    # # ax2.vlines(14400,-20,20,'grey',linestyle = '--')
    # # ax2.vlines(21600,-20,20,'grey',linestyle = '--')
    # # ax2.vlines(28800,-20,20,'grey',linestyle = '--')
    # # ax2.vlines(36000,-20,20,'grey',linestyle = '--')
    # # ax2.vlines(43200,-20,20,'grey',linestyle = '--')
    # #------------------------------------------------------------
    
    # x1.append(i[2])	# 添加i到x轴的數據中
    # y1.append((i[1]))	# 添加i到y轴的數據中   
    # ax2.plot(x1, y1, color='black',linestyle = '-')  # 繪出當前x列表和y列表中的值的圖
    
    
    #ay(前後)
    # ax3 = plt.subplot(gs[2, :])
    # ax3.set_xlabel('time')
    # plt.title('front or back', fontsize=10,color='red')
    # plt.ylim((-20, 20))
    # ax3.set_xticklabels([])#消除x座標值
    # ax3.set_xticks([])#消除x座標刻度
    
    # #每分鐘標註線(計算方法為每秒數據量*60)
    # #------------------------------------------------------------
    # # ax3.vlines(7200,-20,20,'grey',linestyle = '--')
    # # ax3.vlines(14400,-20,20,'grey',linestyle = '--')
    # # ax3.vlines(21600,-20,20,'grey',linestyle = '--')
    # # ax3.vlines(28800,-20,20,'grey',linestyle = '--')
    # # ax3.vlines(36000,-20,20,'grey',linestyle = '--')
    # # ax3.vlines(43200,-20,20,'grey',linestyle = '--')
    # #------------------------------------------------------------
    
    # x2.append((i[46]))	# 添加i到x轴的數據中
    # y2.append(float(i[41]))	# 添加i到y轴的數據中    
    # ax3.plot(x2, y2, color='black',linestyle = '-')  # 繪出當前x列表和y列表中的值的圖
    
    plt.pause(0.5)  # 每0.0083秒跑出一筆數據
    plt.clf() #刪除舊有內存資料
    
    # if len(x) % 10 == 0: #每分鐘數據量
    #     ax1.vlines(len(x),-10,10,'grey',linestyle = '--')
    #     ax2.vlines(len(x),-20,20,'grey',linestyle = '--')
    #     ax3.vlines(len(x),-2,2,'grey',linestyle = '--')
    # if len(x) == 5:
    #     x.pop(0)
    #     y.pop(0)

    # if len(x1) == 5:
    #     x1.pop(0)
    #     y1.pop(0)

    # if len(x2) == 5:
    #     x2.pop(0)
    #     y2.pop(0)




            






    



