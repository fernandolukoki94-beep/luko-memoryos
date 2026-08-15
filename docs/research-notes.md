# Notas de investigação — REX Mine Intelligence

## Fonte 1 — Nokia, 26-09-2024

URL: https://www.nokia.com/blog/the-importance-of-connected-workers-in-mining-digitalization/

A Nokia descreve a conectividade dos trabalhadores como a capacidade de comunicar, colaborar e partilhar informação em tempo real, mesmo em locais remotos, perigosos e dinâmicos. A fonte relaciona dispositivos e aplicações conectadas com alertas sobre avarias, mudanças ambientais e riscos, além de monitorização remota com sensores, câmaras e dados de equipamentos. A manutenção preventiva é apresentada como um caso de uso: sinais de desgaste podem alertar a equipa de manutenção antes de uma avaria, reduzindo paragens.

Implicação para o REX: o primeiro MVP deve ligar o trabalhador de campo a um registo estruturado de ocorrências e à equipa de manutenção, mas deve continuar útil quando a conectividade não estiver disponível. A fonte é uma referência sectorial geral, não prova específica sobre uma empresa de Lualaba.

## Fonte 2 — Speedcast/MCK, 31-08-2021

URL: https://www.speedcast.com/newsroom/press-releases/2021/mining-company-katanga-awards-speedcast-with-multi-year-connectivity-contract-for-headquarters-and-major-mine-site/

A fonte relata um contrato de conectividade para a Mining Company Katanga (MCK), abrangendo a sede em Lubumbashi e a mina de cobre e cobalto Ruashi. O texto afirma que a conectividade é crítica para uma mina digital porque suporta IoT, segurança de pessoas e equipamentos e aplicações para trabalhadores em locais remotos. A solução descrita inclui WAN sobre VSAT/satélite, acesso a aplicações cloud, IoT e aplicações de bem-estar dos trabalhadores.

Implicação para o REX: a conectividade deve ser tratada como variável operacional, não como pressuposto. Um sistema de incidentes que permita captura local, fila de sincronização, indicação clara do estado de sincronização e posterior envio ao centro pode complementar — e não tentar substituir — a infraestrutura de conectividade existente.

## Fonte 3 — African Mining Week / CEEC, 02-10-2025

URL: https://african-miningweek.com/news/drcs-ceec-unveils-new-digital-mineral-traceability-platform

A fonte noticia a plataforma E-trace do CEEC, agência estatal de certificação mineral da RDC. O objectivo anunciado é acompanhar minerais desde a exploração até à exportação, apoiar fornecimento responsável, combater mineração ilegal e formalizar operações artesanais e de pequena escala. A mesma fonte menciona recolha de dados ao longo da cadeia de valor e a existência de um laboratório em Musompo.

Implicação para o REX: rastreabilidade de minerais é uma área relevante, mas já existem iniciativas institucionais específicas. Para evitar duplicação e reduzir o risco comercial, o MVP inicial deve concentrar-se na inteligência operacional interna — incidentes, manutenção, sincronização e estado da operação — deixando integrações de rastreabilidade para uma fase posterior e apenas com autorização.

## Fonte 4 — Glencore/KCC, 08-12-2022

URL: https://www.glencore.com/media-and-insights/news/kamoto-copper-company-spearheads-innovative-employee-engagement-solution

A Glencore relata que a KCC, na província de Lualaba, lançou a aplicação Umoja com Vodacom Business e Standard Bank para enfrentar desafios estruturais de comunicação. A fonte afirma que o acesso à Internet era um desafio significativo na RDC e que trabalhadores nem sempre conseguiam consultar informação crítica em tempo real. A solução disponibilizou smartphones, pacotes de dados e carregadores solares, oferecendo informação de saúde e segurança, auto-atendimento de RH, formação, verificações médicas, actualizações de segurança e canais de feedback.

Implicação para o REX: existe evidência directa de que uma grande operação regional já investiu num canal móvel para trabalhadores. O REX deve posicionar-se como complemento operacional especializado — registo de incidentes, tarefas, manutenção e sincronização offline — e não como simples portal de comunicação ou RH. A existência do Umoja reforça a necessidade de diferenciação.

## Fonte 5 — International Journal of Innovative Approaches in Social Sciences, 2025

URL: https://ijias.issr-journals.org/abstract.php?article=IJIAS-24-319-04

O resumo do estudo sobre Kolwezi afirma que a transformação digital envolve integrar tecnologias nas operações da empresa e que pode optimizar exploração, mineração e processos empresariais. Identifica como factores a considerar a segurança, a formação dos trabalhadores, a complexidade dos sistemas existentes, o quadro regulatório e os custos associados.

Implicação para o REX: o produto deve integrar-se com sistemas existentes, começar por um fluxo pequeno e mensurável, incluir formação simples e evitar prometer uma substituição total do ERP, CMMS ou plataformas corporativas. A arquitectura deve permitir exportação/API futura e manter uma trilha de auditoria.
