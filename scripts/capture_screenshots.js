import { chromium } from 'playwright'
import { spawn } from 'child_process'

async function run() {
  console.log('Starting preview server...')
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], {
    stdio: 'pipe',
    shell: true
  })

  // Wait 2 seconds for server to start
  await new Promise(r => setTimeout(r, 2000))

  const browser = await chromium.launch({ headless: true })

  try {
    // 1. Desktop Viewport (1440 x 900)
    console.log('Capturing Desktop 1440px...')
    const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await pageDesktop.goto('http://localhost:4173')
    await pageDesktop.waitForTimeout(1000)

    // Capture Home / Stage 1 Setup
    await pageDesktop.screenshot({ path: 'screenshots/01_desktop_setup_1440px.png', fullPage: true })

    // Click Stage 2 Period Inputs
    await pageDesktop.locator('text=02').first().click()
    await pageDesktop.waitForTimeout(500)
    await pageDesktop.screenshot({ path: 'screenshots/02_desktop_intake_1440px.png', fullPage: true })

    // Click Stage 3 Decide
    await pageDesktop.locator('text=03').first().click()
    await pageDesktop.waitForTimeout(500)
    await pageDesktop.screenshot({ path: 'screenshots/03_desktop_decide_1440px.png', fullPage: true })

    // Click Stage 5 Close
    await pageDesktop.locator('text=05').first().click()
    await pageDesktop.waitForTimeout(500)
    await pageDesktop.screenshot({ path: 'screenshots/04_desktop_close_1440px.png', fullPage: true })

    // Click Stage 6 Release
    await pageDesktop.locator('text=06').first().click()
    await pageDesktop.waitForTimeout(500)
    await pageDesktop.screenshot({ path: 'screenshots/05_desktop_release_1440px.png', fullPage: true })

    // 2. Mobile Viewport (390 x 844)
    console.log('Capturing Mobile 390px...')
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
    await pageMobile.goto('http://localhost:4173')
    await pageMobile.waitForTimeout(1000)
    await pageMobile.screenshot({ path: 'screenshots/06_mobile_setup_390px.png', fullPage: true })

    await pageMobile.locator('text=03').first().click()
    await pageMobile.waitForTimeout(500)
    await pageMobile.screenshot({ path: 'screenshots/07_mobile_decide_390px.png', fullPage: true })

    console.log('Screenshots captured successfully!')
  } finally {
    await browser.close()
    server.kill()
  }
}

run().catch(err => {
  console.error('Screenshot error:', err)
  process.exit(1)
})
