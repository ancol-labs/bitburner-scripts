import {
        getNsDataThroughFile as fetch,
        runCommand,
        fetchPlayer,
        } from 'utils/helpers.js'
import { purchaseables } from 'utils/constants.js'

/**
 * @param {NS} ns
 **/
export async function main(ns) {
  const player = fetchPlayer()
  const program = purchaseables.find(p => p.name === ns.args[0])
  if ( program === undefined || !player.tor || player.money < program.cost) {
    ns.ui.openTail()
    ns.print('Program buyer quit unexpectedly')
    ns.print('Program: ', program)
    ns.print('player.tor: ', player.tor)
    ns.print('player.money: $', ns.format.number(player.money)," > ",
      ' program.cost $', ns.format.number(program.cost), " ? ",
      player.money >= program.cost)
    return
  }

  ns.tprint(`Buying ${program.name} for \$${ns.format.number(program.cost)}`)
  let result = await fetch(ns, `ns.singularity.purchaseProgram('${program.name}')`,
    '/Temp/purchaseProgram.txt')
  if ( result ) {
    ns.tprint(`SUCCESS: ${program.name} purchased.`)
    return
  }
  ns.tprint(`FAILURE: Purchasing ${program.name} was unsuccessfull. Trying again soon.`)
}
