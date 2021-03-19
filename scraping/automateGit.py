import pyautogui
from datetime import datetime
import time

while True:
    now = datetime.now()
    current_time = str(now.strftime("%H:%M"))

    if current_time == "07:30":
        pyautogui.typewrite("git add *")
        pyautogui.press("enter")
        time.sleep(2)
        pyautogui.typewrite("git commit -m 'Updated CSV File'")
        pyautogui.press("enter")
        time.sleep(2)
        pyautogui.typewrite("git push origin master")
        pyautogui.press("enter")
        time.sleep(60)
        continue