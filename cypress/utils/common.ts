export const checkElementInTheDocument = (selector: string, visible: boolean) => {
  const action = (acc = 0) => {
    if (acc === 30) return

    cy.wait(500)

    cy.window().then(window => {
      const elem = window.document.querySelector(selector)

      if ((!visible && !elem) || (visible && elem)) return

      action(acc + 1)
    })
  }

  action()
}
