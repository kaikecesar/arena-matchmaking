# Sistema de Gerenciamento de Lutas — Documento de Requisitos

> Documento vivo de levantamento de requisitos e decisões arquiteturais do projeto.

---

## Metadados

| Campo | Valor |
|---|---|
| **Versão** | 0.8 |
| **Data** | 18 de maio de 2026 |
| **Autor** | Kaike Cesar Oliveira |
| **Status** | Levantamento concluído (Tópicos 1–3 e 6). Tópicos 4 e 5 adiados conscientemente. Pronto para fase de arquitetura. |

---

## Histórico de Versões

| Versão | Data | Descrição |
|---|---|---|
| 0.1 | 16/05/2026 | Definição inicial: persona primária, modelo de atleta, cartel, vínculos com coaches e regras de contestação. |
| 0.2 | 16/05/2026 | Tópico 3.1 — Tipos de Evento e Configurabilidade. |
| 0.3 | 16/05/2026 | Tópico 3.2.A — Algoritmo de Matchmaking. |
| 0.4 | 16/05/2026 | Tópico 3.2.B — Catálogos de Atributos. |
| 0.5 | 17/05/2026 | Tópico 3.3.A — Inscrição. |
| 0.6 | 17/05/2026 | Tópico 3.3.B — Pesagem. |
| 0.7 | 17/05/2026 | Tópico 3.4 — Card, Agendamento e Chamada do Atleta. |
| 0.8 | 18/05/2026 | Tópico 6 — Requisitos Não-Funcionais: performance/SLOs, disponibilidade, multi-tenancy, LGPD, observabilidade, auditoria, UX. Inclui Seção 10 (RNF) e Seção 11 (catálogo de RF). Tópicos 4 (notificações técnicas) e 5 (integrações) adiados conscientemente. |

---

## Nota sobre Escopo deste Documento

Este documento consolida o levantamento de requisitos dos **Tópicos 1, 2, 3 (completo) e 6**. Os Tópicos 4 (especificação técnica de notificações) e 5 (integrações, ex: transmissão) foram **adiados conscientemente** — a decisão foi avançar para a fase de arquitetura com a base atual, que é suficiente para validação com o design partner e para fundamentar decisões técnicas. Esses tópicos serão detalhados durante o desenvolvimento ou em iterações futuras.

---

## 1. Visão Geral

### 1.1 Propósito

Plataforma para **gerenciamento de eventos de lutas**, com foco inicial nas modalidades de **Boxe** e **Kickboxing**. O sistema cobre todo o ciclo operacional de um evento: cadastro de atletas, inscrições, matchmaking, chaveamento, agendamento, pesagem, chamada de lutas e registro de resultados.

### 1.2 Posicionamento do Produto

> **"Não somos gerenciadores de atletas, somos gerenciadores de lutas."**

Esta frase define o escopo do produto. O sistema não se responsabiliza pelo gerenciamento de carreira do atleta, estado físico, suspensões por comissões atléticas externas, ou operações de academia. O foco é a **operação do evento e suas lutas**.

### 1.3 Estratégia de Lançamento

O MVP será lançado com **um único organizador (design partner)** — um cliente próximo que valida o produto em condições reais de uso. Decisão tomada no Tópico 6. Isso define a escala inicial (ver Seção 10.1) e reforça o princípio de evitar overengineering.

### 1.4 Personas

| Persona | Papel | Prioridade no MVP |
|---|---|---|
| **Organizador de eventos** | Persona primária. Quem paga pelo sistema e quem mais sofre operacionalmente hoje. Toma todas as decisões finais sobre o evento. | Alta |
| **Atleta** | Persona de suporte. Cadastra-se, mantém perfil e cartel, inscreve-se em eventos, recebe notificações. | Média |
| **Coach (Treinador)** | Persona de suporte. Pode cadastrar atletas, é vinculado a um ou mais atletas, recebe notificações sobre lutas dos seus atletas. | Média |

### 1.5 Dor Central Resolvida

O organizador sofre hoje porque:
- O processo de matchmaking é manual e demorado
- Desistências de atletas próximas ao evento causam retrabalho
- Não há ferramenta estruturada para chamar atletas para a luta no dia do evento
- Comparação manual de adversários é cognitivamente custosa

---

## 2. Decisões Arquiteturais Transversais

### 2.1 Modelo de Cartel — Confiança no Input Humano

O sistema **não verifica** lutas declaradas pelo atleta. Confia no input humano e protege apenas contra o incentivo perverso de **reduzir** o cartel. O organizador é a última linha de defesa contra cartéis inflados. Esse princípio se estende a outros dados auto-declarados (nível técnico, peso de referência).

### 2.2 Matchmaking Sugestivo

O sistema **sugere** combinações de lutas, mas **apenas o organizador marca lutas oficialmente**. O sistema é copiloto, não piloto automático.

### 2.3 Atualização de Cartel — Atômica, Não em Batch

O incremento do cartel acontece de forma atômica no momento em que o organizador marca a luta como concluída. UX em tempo real, sem janela de batch.

### 2.4 Catálogo Fixo de Modalidades (MVP)

Modalidades são pré-definidas pela plataforma (boxe, kickboxing). Evita degeneração do dado. **[v2+]** modelo híbrido com sugestão do organizador.

### 2.5 Foco no Brasil no MVP, com Estrutura Aberta

Documento de identificação é CPF no MVP, estrutura aberta para internacionalização (campo `document_type` + `document_value`).

### 2.6 Tipo de Evento Exclusivo

Um evento é **ou** `LUTAS_CASADAS` **ou** `GP` — nunca os dois. Simplifica modelo de dados, UX e casos de borda.

### 2.7 Pagamento Fora do MVP

Taxa de inscrição é informativa no MVP; pagamento é offline. Gateway fica para **[v2]**.

### 2.8 Sem Conceito Formal de "Equipe" no MVP

"Equipe" não é modelada como entidade. Busca de atleta usa atributos diretos (nome, email, CPF). **[v2+]** se houver demanda.

### 2.9 Catálogos Oficiais Read-Only no MVP

Catálogos cadastrados pela plataforma (admin), read-only para organizador. Personalização é **[v2+]**.

### 2.10 Saída de Emergência — Luta Manual como Padrão para Exceções

Situações fora do modelo padrão (categoria diferente, substituição de última hora) usam **luta manual** (override total, rastreado por audit log). Mantém o modelo geral simples.

### 2.11 Isolamento de Responsabilidade Jurídica em Documentos

A plataforma **armazena** documentos mas **não valida o conteúdo**. Validação é responsabilidade do organizador. Protege a plataforma de risco jurídico.

### 2.12 Datetime para Todos os Marcos Temporais

Toda data relevante é tratada como **datetime** (data + horário), nunca data pura. Permite controle fino de janelas, notificações e disparos automáticos.

### 2.13 Pesagem como Validação Definitiva

A pesagem oficial é **única, definitiva e sem re-pesagem**. Fundamentada na prática real (balança extraoficial para auto-conferência). Negociações pós-pesagem ficam fora do sistema.

### 2.14 Notificações Operacionais Não Podem Ser Desativadas

Notificações operacionais (chamada de luta, escalação, desistência, mudança de horário) **não podem ser desativadas** no MVP. Configurabilidade é **[v2+]**.

### 2.15 Online-Only (Sem Offline-First)

O sistema é **online-only** no MVP. Não há offline-first. Decisão fundamentada: o contexto é web/cloud (diferente de Edge Devices com hardware dedicado); replicar offline-first no navegador seria complexidade desproporcional. **[v2+]** reavaliar se conectividade de ginásios for problema real.

### 2.16 Sistema como Facilitador, Não Bloqueador do Evento Físico

Se o sistema cair durante um evento, **as lutas continuam** (juiz, ringue e atletas estão presentes). O sistema coordena e registra, mas não controla o combate. Isso relaxa os requisitos de disponibilidade — o sistema não é single point of failure do evento físico.

### 2.17 Multi-Tenancy por Discriminador (Shared Database)

O sistema adota **shared database, shared schema** com discriminador `organizer_id`. Tabelas de domínio do organizador (eventos, inscrições, lutas, etc.) carregam `organizer_id` **desde o MVP**, mesmo com um único organizador. Tabelas globais (atletas, cartéis, catálogos, coaches) **não** têm discriminador — são compartilhadas entre todos os organizadores. Decisão tomada para não inviabilizar o crescimento futuro (multi-tenancy é caro de retrofitar).

### 2.18 Internacionalização (i18n) Obrigatória na Estrutura

O código **deve usar i18n** (strings externalizadas) desde o MVP, ainda que **apenas o português** seja carregado no lançamento. Idioma único no MVP (português), mas estrutura preparada para expansão futura sem refatoração de strings espalhadas pelo código.

### 2.19 Evitar Overengineering

Dada a escala pequena do MVP (design partner único), o maior risco arquitetural é **overengineering**, não escala. Princípio: **preparar estruturas de dados caras de migrar** (multi-tenancy, audit, separação global vs organizador); **não preparar features fáceis de adicionar depois** (billing, cache, filas, escala horizontal de WebSocket, microserviços).

---

*(continua na Seção 3)*

## 3. Modelo de Atleta

### 3.1 Identidade

Cada atleta tem **um único perfil global** no sistema, persistente entre eventos (e entre organizadores — ver Seção 2.17).

| Campo | Descrição |
|---|---|
| Nome completo | Texto |
| Data de nascimento | Data |
| Sexo | Enum |
| Documento | Tipo + valor (CPF no MVP) |
| Foto | URL/imagem |
| Contato | Email, telefone |
| Data de primeiro cadastro | Timestamp imutável (sinal de confiança para organizador) |

### 3.2 Dados Competitivos (por Modalidade)

Um atleta pode praticar **N modalidades**. Cada modalidade tem dados competitivos próprios, **mas o perfil de identidade é único**.

| Campo | Descrição |
|---|---|
| Modalidade | Catálogo fixo (boxe, kickboxing no MVP) |
| Nível técnico | Amador / Profissional — declaração livre (ver Seção 6.4) |
| Peso de referência | Declarado pelo atleta, atualizável |
| Cartel | Número único, monotônico crescente (ver Seção 3.3) |

**Observação:** o atleta **não declara categoria** do catálogo diretamente. Declara **atributos brutos** (peso, idade, sexo, nível técnico); o sistema mapeia para a categoria do catálogo do evento na inscrição (Seção 6.3).

### 3.3 Cartel — Regras Detalhadas

#### 3.3.1 Definição
Cartel é um **número único** por modalidade. **Não há separação** entre lutas verificadas e declaradas.

#### 3.3.2 Regra do Piso (Monotônico Crescente)
- No primeiro cadastro em uma modalidade, o atleta declara valor inicial N, que vira **piso permanente**
- Edições só podem **aumentar**, nunca diminuir
- Valor aumentado vira o novo piso (não volta a valor anterior)

#### 3.3.3 Incremento Automático
- Luta marcada como **concluída** pelo organizador incrementa o cartel em +1 atomicamente
- Lutas registradas como **WO** incrementam ambos os cartéis (vencedor e desclassificado)
- Sem batch — tempo real

#### 3.3.4 Edição pelo Atleta
- Livre, desde que novo valor > atual
- Toda edição gera **log de auditoria** (timestamp, valor anterior, novo, origem)
- Log visível ao organizador na inscrição

#### 3.3.5 Decremento — Exceção Controlada
Única forma de diminuir: **correção do organizador** dentro da Janela de Contestação (Seção 3.4). Exceção justificada (correção de dado errado, não manipulação).

### 3.4 Resultado de Luta — Janela de Contestação

| Aspecto | Regra |
|---|---|
| Quem marca o resultado | Organizador, ao fim de cada luta |
| Janela de correção | 7 dias após encerramento do evento |
| Quem pode corrigir | Apenas o organizador |
| Ações possíveis | Corrigir resultado, anular (No Contest), cancelar registro |
| Após 7 dias | Resultado **imutável** |
| Auditoria | Log com origem `organizador-correção`, timestamp, justificativa |

### 3.5 Vínculos com Coaches

| Aspecto | Regra |
|---|---|
| Quantos coaches | 0 ou N por atleta |
| Autonomia do atleta | Inscreve-se sem aprovação do coach no MVP. Coach é notificado, não veta. |
| Desvinculação | Por qualquer um dos lados |
| Histórico de vínculos | Mantido (saber quem era coach na época de uma luta) |
| Notificação de chamada | Todos os coaches vinculados no momento são notificados |

### 3.6 Estado do Atleta

**Sem modelagem complexa de estados.** Atleta existe e pode se inscrever. Sistema não modela lesão, suspensão externa, ou afastamento voluntário.

### 3.7 Casos Operacionais — Decisões

| Caso | Decisão |
|---|---|
| Inscreve mas organizador não aceita | Nada acontece. Nenhuma luta sugerida/marcada. |
| Inscreve em dois eventos no mesmo dia | Popup de alerta. Se aceitar, por conta e risco. |
| Cortado por peso na pesagem | Luta vira **vacante**. Organizador decide (cancelar/WO/luta manual) — Seção 8.5. |
| Lesionado se inscreve assim mesmo | Sistema permite. Conta e risco do atleta. |

### 3.8 Transparência ao Organizador

No momento da inscrição, o organizador vê: cartel total (por modalidade), data do primeiro cadastro, histórico de edições de cartel, histórico de lutas no sistema, nível técnico declarado, documentos enviados.

> **[TODO v3/v4]** Métricas avançadas de cartel (vitórias, derrotas, métodos). No MVP, só o total.

---

## 4. Modelo de Evento

### 4.1 Anatomia Geral

Evento tem **um único tipo** (`LUTAS_CASADAS` ou `GP`), imutável após criação. Pertence a um organizador (`organizer_id`).

| Campo | Descrição |
|---|---|
| Nome | Texto |
| Data e horário | Datetime |
| Local | Endereço |
| Organizador | Vínculo (`organizer_id`) |
| Tipo | `LUTAS_CASADAS` ou `GP` (imutável) |
| Modalidades permitidas | Subconjunto do catálogo (1+). Pode ser misto. |
| Catálogo escolhido | Catálogo oficial (Seção 6) |
| Categorias aceitas | Subconjunto selecionado pelo organizador (Seção 6.2) |
| Data limite de inscrição | Configurável (default: 3 dias antes) — Seção 7.1 |
| Datetime início/fim da pesagem | Configurável (Seção 8.1) |
| Tolerância de peso (gramas) | Configurável (Seção 8.2) |
| Documentos requeridos | Atestado médico (sempre) + autorização parental (se aplicável) |
| Estado | Seção 4.5 |
| Taxa de inscrição | Informativo no MVP (pagamento offline). **[v2]** gateway. |

### 4.2 Evento Tipo LUTAS_CASADAS

Lutas 1v1 avulsas, sem progressão. Config: **limite de lutas no card**. Fluxo: inscrições → pool → organizador escala com matchmaking → não escalados notificados.

### 4.3 Evento Tipo GP

N GPs internos, cada um um torneio em chave. Cada GP = combinação do catálogo (modalidade + peso + faixa etária + nível). Tamanho da chave configurável.

**GP Flexível:** sistema não força potências de 2; organizador decide (cancela / bye manual / ajusta). **[v2]** semeadura automática.

**Bye:** atleta avança sem lutar; bye manual no MVP; bye não conta como luta para o cartel *(a confirmar)*; luta com bye não aparece no card.

**Progressão:** vencedor avança automaticamente; sistema gerencia estado da chave por GP.

### 4.4 Inscrição vs Escalação

| Estado | Definição | Trigger |
|---|---|---|
| Inscrito | Declarou interesse, está no pool | Atleta clica "inscrever-se" |
| Escalado | Selecionado para uma luta | Organizador monta luta |
| Não escalado | Inscrito não selecionado | Inferido ao fim do matchmaking |

Inscrição aberta a qualquer atleta cuja categoria seja aceita; sem limite de inscritos; limite de lutas/chave determina escalados; não escalados notificados com motivo quando possível. Detalhamento na Seção 7.

### 4.5 Estados do Evento

```
[Rascunho] → [Inscrições Abertas] → [Inscrições Fechadas] → [Matchmaking]
→ [Card Definido] → [Pesagem] → [Em Andamento] → [Encerrado]
→ [Janela de Contestação] (7 dias) → [Finalizado]
```

| Estado | Quem edita | O que está aberto |
|---|---|---|
| Rascunho | Organizador | Tudo. Não visível publicamente. |
| Inscrições Abertas | Organizador (limitado) | Atletas se inscrevem. Regras congeladas. |
| Inscrições Fechadas | Organizador | Pool definido. Inscrições bloqueadas. |
| Matchmaking | Organizador | Monta lutas com auxílio do sistema. |
| Card Definido | Organizador (mudanças notificam) | Lutas marcadas. Atletas/coaches notificados. Card visível (Seção 9.8). |
| Pesagem | Organizador | Registra pesos. Cortes/no-shows geram vacantes (Seção 8.5). Permanece neste estado até resolver. |
| Em Andamento | Organizador | Lutas acontecendo. Resultados ao vivo. Reordenamento limitado (Seção 9.3). |
| Encerrado | Organizador | Lutas concluídas. Cartel incrementado. |
| Janela de Contestação | Organizador (correções) | 7 dias para corrigir/anular/cancelar. |
| Finalizado | Ninguém | Imutável. Histórico permanente. |

### 4.6 Configurabilidade por Evento (Resumo)

Configurado na criação, congelado após inscrições abertas: formato de luta (rounds/duração/intervalo), diferença máx. de peso/cartel/idade, sexo separado (fixo), nível técnico separado (fixo), catálogo, subconjunto de categorias, limite de lutas (LUTAS_CASADAS), tamanho de chave (GP), data limite de inscrição, janela de pesagem, tolerância de peso, documentos requeridos, taxa de inscrição.

> **[v2]** Nível técnico configurável, categorias customizáveis, documentos customizáveis, delegação de pesagem.

### 4.7 Pontos de Atenção Futuros
1. **Bye no GP:** modelagem de luta-com-bye, atleta que avança sem lutar, impacto no cartel.
2. **Fechamento manual de inscrições:** validar default de 3 dias com organizadores.
3. **Default de tolerância de peso:** definir com organizadores.

---

## 5. Matchmaking

### 5.1 Princípios
- Sugestivo, não automático
- Validação **individual por luta** (esporte de contato, luta mal casada machuca)
- Transparência sem números (semáforo de cores)
- Pool restrito a atletas com documentos validados (Seção 7.3)

### 5.2 Modelo de Três Níveis

| Nível | Cor | Significado |
|---|---|---|
| Match Ótimo | Verde | Mesma categoria do catálogo (peso, faixa etária, nível, sexo) |
| Compatível | Amarelo | Categorias diferentes, dentro dos limites do evento |
| Incompatível | Vermelho | Bloqueador absoluto |

#### 5.2.1 Bloqueadores Absolutos (Vermelho)
Sexos diferentes; modalidades diferentes; níveis técnicos diferentes; diferença de peso/idade/cartel fora dos limites; atletas já lutaram entre si neste evento (GP, fase anterior).

#### 5.2.2 Match Ótimo (Verde)
Atletas Compatíveis na **mesma categoria do catálogo**. Score interno, **não exposto** ao organizador. **[v2]** considerar histórico (revanche, W/L).

### 5.3 Interface
Mapa de compatibilidade por cor; filtros (só verdes / verdes+amarelos / todos); validação individual de cada luta.

### 5.4 Override de Luta Incompatível
Organizador pode forçar luta vermelha: confirmação explícita; audit log (timestamp, organizador, motivo); flag `override_incompatibilidade`.

### 5.5 Reatividade a Desistências

| Cenário | Quando | Ação |
|---|---|---|
| A | Antes de "Card Definido" | Sai do pool. Reroda matchmaking. |
| B | Após "Card Definido", antes da pesagem | Luta cancelada. Restante notificado. Sem substituto automático. |
| C | Durante a pesagem (corte/no-show) | Seção 8.5. Vira vacante; organizador decide. |
| D | No dia, "Em Andamento" | Notifica organizador. Cancela ou luta manual (Seção 5.6). |

Granularidade: com múltiplas lutas, desistência é por luta específica (Seção 7.6).

### 5.6 Luta Manual
Override total (sem validação de compatibilidade, sem limites, sem restrição de categoria). Busca por nome (parcial), email (exata), CPF (exata, normalizada). Flag `criada_manualmente` + audit log.

---

## 6. Catálogos de Categorias

### 6.1 Estrutura (Modelo B — Dimensões Separadas)

| Dimensão | Conteúdo |
|---|---|
| Categorias de peso | **Segregadas por sexo** no catálogo oficial |
| Faixas etárias | Juvenil, Adulto, Master, etc. |
| Níveis técnicos | Amador, Profissional |

Governança: cadastrados pela plataforma (admin), read-only no MVP. 2-3 catálogos iniciais (CBBoxe, WAKO, possivelmente Boxe Profissional). Valores específicos = seed de banco, fora do escopo de requisitos.

### 6.2 Relacionamento Evento × Catálogo
Organizador escolhe modalidade(s) → um catálogo oficial por modalidade → subconjunto de categorias aceitas. Atletas só se inscrevem se categoria mapeada for aceita. Em GP, cada categoria = um GP. Quebras de padrão via luta manual.

### 6.3 Relacionamento Atleta × Catálogo
Atleta declara atributos brutos (peso de referência, data de nascimento, sexo, nível técnico, modalidades). Sistema mapeia para categoria do catálogo na inscrição. Atleta declara **peso pretendido** na inscrição (Seção 7.2). Pesagem oficial pode invalidar categoria (Seção 8).

### 6.4 Nível Técnico — Declaração Livre
Atleta declara livremente Amador/Profissional. Sistema não verifica. Organizador pode contestar. Audit log registra alterações.

### 6.5 Backlog de Catálogos
**[v2]** clonar+personalizar (snapshot privado); novos catálogos oficiais sob demanda. **[v3]** versionamento; catálogos compartilhados; aprovação comunitária. **[i18n]** unidades (kg/lbs).

---

## 7. Inscrição

### 7.1 Janela de Inscrição
Abertura manual (organizador muda estado); fechamento automático na data limite; fechamento manual antes permitido; data limite default 3 dias antes (configurável). **[TODO]** validar 3 dias.

### 7.2 Ato de Se Inscrever

| Campo | Regra |
|---|---|
| Modalidade | Uma por inscrição (duas modalidades = duas inscrições, mesmo pós-MVP) |
| Peso pretendido | Peso planejado para o dia (não atual). Intenção competitiva, validada na pesagem. |
| Categoria mapeada | Calculada (peso pretendido + idade + sexo + nível) contra o catálogo |
| Aceite de termos | Dois checkboxes: termos da plataforma + termos do evento. Explícito (jurídico). |
| Documentos requeridos | Conforme evento (Seção 7.3) |

Modalidade não declarada: fluxo inline de adicionar (atributos brutos + cartel inicial + nível).

### 7.3 Documentos Requeridos
Princípio (Seção 2.11): plataforma armazena, não valida.

| Documento | Quando |
|---|---|
| Atestado médico | Sempre |
| Autorização parental | Se menor de idade na data do evento |

Formato: PDF ou imagem. Vive **na inscrição** (não no perfil), upload próprio por inscrição. Validação pelo organizador (Validar/Rejeitar com motivo). Atleta com documento pendente não entra no pool de matchmaking. **[v2]** documentos customizáveis.

### 7.4 Validações Automáticas
Perfil completo; modalidade declarada (ou inline); categoria aceita pelo evento; não inscrito no mesmo evento/modalidade; evento em `Inscrições Abertas`; alerta (não bloqueio) se inscrito em outro evento na mesma data. Idade mínima: consequência natural do mapeamento de categoria.

### 7.5 Status da Inscrição
Inscrição incompleta; Pendente de validação; Documentos rejeitados; Aguardando matchmaking; Em matchmaking; Escalado; Não escalado; Cancelado pelo atleta; Evento cancelado/adiado.

### 7.6 Cancelamento pelo Atleta

| Quando | Ação | Implicação |
|---|---|---|
| Antes de "Card Definido" | Cancela inscrição inteira | Sai do pool, sem consequências |
| Após "Card Definido" (escalado) | Cancela luta específica | Desistência daquela luta (Cenário B). Outras lutas seguem. |

Múltiplas lutas: cancela cada uma individualmente. Reembolso: **[TODO v2]**.

### 7.7 Múltiplas Lutas por Atleta
Organizador pode escalar o mesmo atleta múltiplas vezes (LUTAS_CASADAS) ou fases (GP). Popup de alerta ao escalar atleta já escalado (não bloqueia). Notificações separadas por luta. Atleta não recusa escalação — se não quiser, cancela a luta (Seção 7.6).

---

## 8. Pesagem

### 8.1 Janela de Pesagem
Datetime início e fim configuráveis (dia anterior ou mesmo dia). Evento entra em `Pesagem` por transição manual. Atletas/coaches notificados. Princípio datetime (Seção 2.12).

### 8.2 Tolerância de Peso
Configurável por evento, em **gramas absolutas**. Para 1kg, inserir 1000. Default **[TODO]**.

### 8.3 Validação de Peso
**Apenas o teto** (piso não validado). Limite máx. aceito = limite da categoria + tolerância. Peso ≤ máx → aprovado; peso > máx → fora do peso.

### 8.4 Registro da Pesagem
Campos: atleta, peso medido, timestamp, quem registrou (organizador no MVP), resultado (`aprovado`/`fora_do_peso`/`no_show`), observação opcional. Audit log automático. **Pesagem única, sem re-pesagem** (Seção 2.13). Delegação a auxiliares: **[v2]**.

### 8.5 Tratamento de Corte de Peso e No-Show
Fluxo automático: (1) luta vira "vacante por corte/no-show"; (2) notifica adversário; (3) notifica atleta cortado.

Organizador decide:

| Caminho | Efeito |
|---|---|
| Cancelar | Luta sai do card. Cartéis intactos. |
| Registrar WO | Adversário vence. Ambos cartéis +1 (Seção 3.3.3). |
| Luta manual com substituto | Cortado eliminado; adversário recebe novo oponente (Seção 5.6). |

Notificação ao adversário **incluída no MVP** (trigger automático, custo irrisório).

### 8.6 No-Show — Detecção Automática
No fim da janela: sistema marca atletas sem pesagem como `no_show` e dispara fluxo da Seção 8.5.

### 8.7 Estado do Evento Durante a Pesagem
Permanece em `Pesagem` mesmo com cortes (não volta a Matchmaking). Transição para `Em Andamento` só após todas as pesagens e resoluções.

### 8.8 Regra de WO no Cartel
WO: adversário vence, ambos cartéis +1, audit log registra que foi WO. **[v3/v4]** distinguir WO de vitória por combate.

---

## 9. Card, Agendamento e Chamada do Atleta

### 9.1 Modelo do Card
Híbrido: ordem sequencial (vinculante) + horário previsto (datetime, dinâmico). Equilibra previsibilidade e realismo (atrasos do esporte).

### 9.2 Estrutura de uma Luta
Número de ordem; Atleta A; Atleta B; modalidade; categoria; rounds e duração; horário previsto (dinâmico); estado (Seção 9.4); tags (`override_incompatibilidade`, `criada_manualmente`, `parte_de_GP_X_fase_Y`); vencedor; método de finalização.

### 9.3 Reordenamento Condicional
Antes de "Em Andamento": reordenamento livre. Durante "Em Andamento": só antecipar/adiar. Qualquer mudança após "Card Definido" notifica atletas/coaches afetados.

### 9.4 Estados de uma Luta
```
[Agendada] → [Próxima] → [Em Andamento] → [Concluída]
                  ↓
             [Cancelada] / [Vacante]
```
Próxima dispara a chamada (Seção 9.7).

### 9.5 Lutas Vacantes no Card
Permanecem com numeração original ("Vacante — Decisão pendente"). Numeração só reajusta se cancelar. WO ou luta manual mantêm posição.

### 9.6 Card no Contexto de GP
Card cronológico único (nome indica GP+fase) + visualização de chave por GP (uma tela por GP). LUTAS_CASADAS não tem visualização de chave.

### 9.7 Chamada do Atleta

#### 9.7.1 Disparo
Híbrido: **automático** quando a luta **2 posições antes** entra em `Em Andamento` (~20-30min de preparação); **manual** pelo organizador a qualquer momento.

#### 9.7.2 Destinatários
Ambos os atletas da luta + todos os coaches vinculados a cada um.

#### 9.7.3 Canais e Conteúdo
> **[TODO técnico]** Canais (push, in-app, email, SMS) e conteúdo. Pertence à especificação técnica de notificações, fora do escopo de requisitos de negócio.

#### 9.7.4 Configurabilidade
Notificações operacionais não podem ser desativadas no MVP (Seção 2.14).

#### 9.7.5 Confirmação Ativa
Sem confirmação ativa no MVP. Atleta ausente: organizador resolve offline. **[v2]** confirmação + tela de status.

### 9.8 Visibilidade do Card
Rascunho até Matchmaking: só organizador. Card Definido em diante: organizador + atletas escalados + coaches vinculados. **[v2]** card público.

### 9.9 Tela de Controle do Organizador (Conceitual)
"Evento ao Vivo": card com estados; concluir luta; card de chamada; próximas lutas; ações (chamar manual, antecipar, adiar, cancelar, luta manual). Detalhamento de UI = fase de design.


---

## 10. Requisitos Não-Funcionais

### 10.1 Dimensionamento (MVP — Design Partner Único)

Números de trabalho marcados como **[A VALIDAR]** — revisar quando houver tração real.

| Métrica | Valor de trabalho |
|---|---|
| Organizadores ativos | 1 (design partner) |
| Eventos simultâneos | ~1 (até 3 no teto teórico) |
| Inscritos por evento (típico) | 50–100 |
| Inscritos por evento (pior caso) | até 200 |
| Lutas por evento | até 80 |
| Usuários totais (primeiros meses) | centenas |

**Implicação:** escala trivial para stack moderna. A única operação potencialmente pesada é o matchmaking (cálculo par-a-par; com 200 inscritos = ~40.000 combinações, ainda trivial via query bem feita no Postgres). Foco em **simplicidade e custo baixo**, não em escala.

**Perfil de tráfego: bursty.** ~99% do tempo ocioso; pico concentrado durante o evento ao vivo (4-6h). Esse perfil é relevante para a decisão de arquitetura (a explorar na próxima fase).

### 10.2 Performance e SLOs

| Classe | Alvo | Operações |
|---|---|---|
| Tempo real crítico | p95 < 500ms, p99 < 1s | Chamada de atleta, registro de pesagem, registro de resultado |
| Interativo | p95 < 1.5s, p99 < 3s | Inscrição, card, login, listagem, upload de documento, atualização de horário |
| Computacional | p95 < 10s, p99 < 30s | Matchmaking |

### 10.3 Persistência e Real-Time

- **Postgres puro** — sem TimescaleDB. Decisão consciente: não há time-series real (dados temporais como audit logs e pesagens são baixo volume).
- **WebSocket apenas** durante estados `Pesagem` e `Em Andamento` do evento (card ao vivo). Restante do sistema é REST.
- **Real-time é requisito, não luxo** — durante esses estados, deve funcionar (não há degradação para polling como estratégia primária).
- **Nota de arquitetura:** WebSocket em máquina única aguenta o MVP. Escala horizontal exigirá pub/sub no futuro (conexões persistentes têm estado por máquina).

### 10.4 Disponibilidade e Tolerância a Falhas

- **Sistema é facilitador, não bloqueador** (Seção 2.16) — evento físico sobrevive a quedas; sistema relaxa requisitos de disponibilidade.
- **Online-only** (Seção 2.15) — sem offline-first no MVP.
- **Disponibilidade alvo: 99.9% geral**, com **blindagem especial das janelas de evento conhecidas**. Vantagem: eventos são agendados, então o sistema sabe quando a criticidade é alta e pode planejar manutenções para janelas livres.
- **RPO:** ≤ 5min durante evento, ≤ 24h fora. **RTO:** ≤ 1h. Alcançável com backup gerenciado de Postgres (point-in-time recovery).

### 10.5 Escalabilidade e Multi-Tenancy

- **Modelo:** shared database + discriminador `organizer_id` (Seção 2.17).
- **Dados por organizador** (com `organizer_id`): eventos, inscrições, lutas, cards, pesagens, configurações.
- **Dados globais** (sem discriminador): atletas, cartéis, catálogos oficiais, coaches, vínculos atleta-coach.
- **Decisões caras de reverter (preparar agora):** multi-tenancy (`organizer_id`), atleta global, Postgres, audit logs desde o início.
- **Decisões fáceis (refatorar depois):** billing, painel multi-org, cache, filas, escala horizontal de WebSocket, customização por tenant.
- **Princípio (Seção 2.19):** preparar dados caros de migrar; não preparar features fáceis de adicionar.

### 10.6 Segurança e Privacidade (LGPD)

#### 10.6.1 Dados Sensíveis e Bases Legais
- Atestado médico = **dado de saúde (sensível)**; autorização parental = **dados de menor + de terceiros (os pais)**.
- **Consentimento LGPD** para tratamento desses documentos fica registrado via **aceite dos termos da plataforma**, com timestamp e versão.

#### 10.6.2 Retenção e Descarte
- Arquivos de documentos sensíveis **descartados automaticamente 180 dias após o encerramento do evento**.
- Registro de que o documento existiu e foi validado **permanece** (audit); o arquivo em si é apagado.

#### 10.6.3 Direitos do Titular
- **Exclusão de conta (direito ao esquecimento):** **anonimização irreversível** — dados pessoais (nome, CPF, contato, foto) apagados; registros esportivos de terceiros preservados (cartéis de adversários intactos); atleta vira "Atleta removido".
- **Demais remoções operacionais:** **soft delete** (reversível, dado marcado inativo via `deleted_at`).
- **Distinção fundamental:** anonimização = direito legal exercido (irreversível); soft delete = saída de operação (reversível).
- Pedidos LGPD tratados **manualmente** no MVP (prazo legal de 15 dias), com capacidade técnica de anonimização. Self-service: **[v2]**.

#### 10.6.4 Segurança Técnica (Obrigatório no MVP)
- Senhas com hash forte (bcrypt/argon2)
- HTTPS/TLS em todas as comunicações
- Documentos sensíveis criptografados em repouso
- Controle de acesso por papel (atleta / coach / organizador)
- Documentos acessíveis **apenas** pelo dono (atleta) e pelo organizador do evento onde se inscreveu — **coach NÃO acessa atestado médico**
- Audit log de acessos a dados sensíveis (recomendado)
- Rate limiting / proteção contra brute force (recomendado)

**[v2]** 2FA; self-service de direitos LGPD.

### 10.7 Observabilidade

- **Logs — registrar:** erros/exceções; transições de estado de evento; ações sensíveis (override, luta manual, correção de cartel, validação/rejeição de documento, pesagem, resultado); autenticação.
- **Logs — NÃO registrar:** dados pessoais em texto plano (usar IDs/referências); conteúdo de documentos sensíveis; senhas. *(Alinhado com LGPD — Seção 10.6.)*
- **Métricas:** latência das operações críticas (validar SLOs); taxa de erro por endpoint; conexões WebSocket ativas; métricas de produto (inscrições, eventos criados).
- **Alertas (raros e acionáveis):**
  - **Crítico (notifica imediatamente):** sistema fora do ar **durante janela de evento agendado**
  - **Atenção (revisar depois):** taxa de erro elevada, latência degradada
  - **Sem alerta:** o resto
- **Alertas contextuais à janela de evento** — só acorda fora de hora se houver evento ativo naquele momento.

### 10.8 Auditoria e Compliance

- **Princípio unificador:** toda ação que altera dados de forma irreversível, ou que envolve decisão discricionária do organizador (override, correção, validação), gera **registro de auditoria imutável** com: quem, o quê, quando, e (quando aplicável) por quê.
- **Imutabilidade:** audit logs são **append-only**. Nem organizador nem admin podem alterar retroativamente.
- **Retenção:** mínimo de **2 anos** (logs são leves, contêm referências/IDs e não dados sensíveis pesados).
- Ações já auditadas no modelo: edições de cartel, correções na janela de contestação, alterações de nível técnico, override de incompatibilidade, luta manual, registro de pesagem, WO.

### 10.9 UX e Acessibilidade

- **Mobile-first** para atleta e coach (uso no celular, no ginásio).
- **Responsivo** para organizador (desktop para matchmaking; mobile/tablet para operação no dia).
- **Apenas web responsivo** no MVP — sem PWA elaborado, sem app nativo.
- **Acessibilidade (a11y):** **decisão consciente de NÃO implementar requisitos formais de acessibilidade no MVP.** (Registrado como escolha deliberada, não omissão.)
- **i18n obrigatório na estrutura** (Seção 2.18): código com strings externalizadas, mas **apenas português** carregado no MVP. Expansão de idiomas é futura.

---

## 11. Catálogo de Requisitos Funcionais (Referencial)

Lista numerada e referenciável dos requisitos funcionais, apontando para as seções que os detalham. Serve como tabela de conformidade.

### Atleta e Cartel
| ID | Requisito | Seção |
|---|---|---|
| RF-001 | Atleta tem perfil global único, persistente entre eventos e organizadores | 3.1 |
| RF-002 | Atleta pode praticar N modalidades, com dados competitivos por modalidade | 3.2 |
| RF-003 | Cartel é número único por modalidade, monotônico crescente (regra do piso) | 3.3.2 |
| RF-004 | Cartel incrementa automaticamente ao concluir luta (inclui WO) | 3.3.3, 8.8 |
| RF-005 | Edição de cartel pelo atleta só aumenta; gera audit log | 3.3.4 |
| RF-006 | Organizador pode corrigir/anular resultado em janela de 7 dias | 3.4 |
| RF-007 | Atleta tem 0..N coaches; vínculo desfazível por ambos; histórico mantido | 3.5 |

### Evento
| ID | Requisito | Seção |
|---|---|---|
| RF-010 | Evento tem tipo exclusivo (LUTAS_CASADAS ou GP), imutável | 2.6, 4.1 |
| RF-011 | Evento LUTAS_CASADAS tem limite de lutas configurável | 4.2 |
| RF-012 | Evento GP suporta N GPs internos, cada um por categoria | 4.3 |
| RF-013 | GP flexível: organizador decide cancelar/bye/ajustar | 4.3 |
| RF-014 | Evento tem ciclo de estados definido | 4.5 |
| RF-015 | Configurabilidade por evento (formato, limites, catálogo, etc.) | 4.6 |

### Inscrição
| ID | Requisito | Seção |
|---|---|---|
| RF-020 | Janela de inscrição (abertura manual, fechamento auto/manual) | 7.1 |
| RF-021 | Atleta declara modalidade, peso pretendido, aceita termos, anexa documentos | 7.2 |
| RF-022 | Documentos requeridos: atestado médico + autorização parental (se menor) | 7.3 |
| RF-023 | Plataforma armazena documentos, organizador valida (não a plataforma) | 2.11, 7.3 |
| RF-024 | Validações automáticas na inscrição | 7.4 |
| RF-025 | Inscrição tem estados visíveis ao atleta | 7.5 |
| RF-026 | Cancelamento: inscrição inteira (antes do card) ou luta específica (depois) | 7.6 |
| RF-027 | Organizador pode escalar mesmo atleta em múltiplas lutas (com alerta) | 7.7 |

### Matchmaking
| ID | Requisito | Seção |
|---|---|---|
| RF-030 | Matchmaking sugestivo; só organizador marca lutas | 2.2, 5.1 |
| RF-031 | Classificação em três níveis (semáforo verde/amarelo/vermelho) | 5.2 |
| RF-032 | Organizador valida lutas individualmente | 5.1, 5.3 |
| RF-033 | Override de luta incompatível (com confirmação + audit) | 5.4 |
| RF-034 | Reatividade a desistências por estado do evento | 5.5 |
| RF-035 | Luta manual (override total, busca por nome/email/CPF) | 5.6 |

### Catálogos
| ID | Requisito | Seção |
|---|---|---|
| RF-040 | Catálogos oficiais (dimensões separadas), read-only no MVP | 6.1 |
| RF-041 | Organizador seleciona catálogo + subconjunto de categorias | 6.2 |
| RF-042 | Sistema mapeia atributos brutos do atleta para categoria do catálogo | 6.3 |
| RF-043 | Nível técnico por declaração livre | 6.4 |

### Pesagem
| ID | Requisito | Seção |
|---|---|---|
| RF-050 | Janela de pesagem configurável (datetime início/fim) | 8.1 |
| RF-051 | Tolerância em gramas, configurável; validação só do teto | 8.2, 8.3 |
| RF-052 | Registro de pesagem (única, sem re-pesagem) | 8.4 |
| RF-053 | Corte/no-show gera luta vacante; organizador decide (cancelar/WO/substituto) | 8.5 |
| RF-054 | Detecção automática de no-show ao fim da janela | 8.6 |

### Card e Chamada
| ID | Requisito | Seção |
|---|---|---|
| RF-060 | Card híbrido (ordem vinculante + horário dinâmico) | 9.1 |
| RF-061 | Luta tem estados próprios | 9.4 |
| RF-062 | Reordenamento condicional ao estado do evento (com notificação) | 9.3 |
| RF-063 | Lutas vacantes mantêm numeração até decisão | 9.5 |
| RF-064 | GP: card cronológico + visualização de chave por GP | 9.6 |
| RF-065 | Chamada do atleta: automática (2 lutas antes) + manual | 9.7 |
| RF-066 | Visibilidade do card por estado do evento | 9.8 |

---

## 12. Itens Postergados (Backlog)

### Tópicos de Levantamento Adiados
- **Tópico 4 — Especificação técnica de notificações:** canais (push, in-app, email, SMS, WhatsApp), conteúdo, infraestrutura.
- **Tópico 5 — Integrações:** transmissão e outras integrações externas.

### v2
- Aprovação de inscrição pelo coach
- Modalidades híbridas (organizador sugere, plataforma aprova)
- Pagamento online (gateway, reembolso, repasse)
- Catálogos personalizados (clonar e editar)
- Nível técnico configurável (subdivisões)
- Semeadura automática de GP
- Conceito formal de Equipe
- Matchmaking com histórico (revanche, W/L)
- Sugestão automática de substituto (Cenário B)
- Documentos customizáveis pelo organizador
- Delegação de pesagem a auxiliares
- Configurabilidade de notificações
- Confirmação ativa de chamada + tela de status
- Card público para audiência
- 2FA; self-service de direitos LGPD
- App nativo (se push no iOS for problema real)

### v3 / v4
- Cartel discriminado (vitórias, derrotas, métodos, WO distinto)
- Reavaliação do caso "atleta cortado por peso" no histórico
- Versionamento de catálogos oficiais

### Internacionalização
- Carregar idiomas além do português (estrutura i18n já obrigatória desde o MVP — Seção 2.18)
- Localização de catálogos
- Unidades de medida (kg vs lbs)

### TODOs Operacionais (validar com organizadores reais)
- Default de 3 dias para fechamento de inscrição
- Default de tolerância de peso
- Caso "atleta cortado por peso" entra ou não no histórico
- Fechamento manual de inscrições

---

## 13. Roadmap de Levantamento

| # | Tópico | Status |
|---|---|---|
| 1 | Persona primária e dor central | ✅ Concluído |
| 2 | Modelo de atleta + cartel | ✅ Concluído |
| 3.1 | Tipos de Evento e Configurabilidade | ✅ Concluído |
| 3.2.A | Algoritmo de Matchmaking | ✅ Concluído |
| 3.2.B | Catálogos de Atributos | ✅ Concluído |
| 3.3.A | Inscrição | ✅ Concluído |
| 3.3.B | Pesagem | ✅ Concluído |
| 3.4 | Card, Agendamento e Chamada do Atleta | ✅ Concluído |
| 6 | Requisitos Não-Funcionais | ✅ Concluído |
| 4 | Notificações (técnico) | ⏸️ Adiado conscientemente |
| 5 | Integrações | ⏸️ Adiado conscientemente |
| — | **Fase de Arquitetura** | ▶️ **Próxima etapa** |

---

## 14. Glossário

| Termo | Definição |
|---|---|
| **Cartel** | Número total de lutas oficiais de um atleta em uma modalidade. |
| **Luta casada** | Combate 1v1 acordado entre dois atletas. |
| **GP (Grand Prix)** | Torneio com múltiplos atletas em chaveamento. N GPs por evento tipo GP. |
| **Matchmaking** | Sugestão/combinação de atletas por compatibilidade. |
| **Inscrito** | Atleta no pool de candidatos de um evento. |
| **Escalado** | Atleta selecionado para uma luta específica. |
| **Chamada de luta** | Aviso ao atleta e coaches de que a luta se aproxima. Automática (2 lutas antes) + manual. |
| **No Contest (NC)** | Luta nula, não conta para o cartel. |
| **Walkover (WO)** | Vitória por desclassificação (corte de peso, no-show). Conta como luta: incrementa cartel de ambos. |
| **Bye** | Passe automático para a próxima fase do GP sem lutar. |
| **Pesagem** | Conferência oficial de peso. Única, definitiva, sem re-pesagem. |
| **Corte de peso** | Atleta acima do limite + tolerância na pesagem. |
| **No-show** | Atleta escalado que não compareceu à pesagem. |
| **Tolerância de peso** | Margem em gramas, configurável, somada ao limite da categoria. |
| **Card** | Programação oficial de lutas. Modelo híbrido (ordem + horário dinâmico). |
| **Match Ótimo / Compatível / Incompatível** | Níveis do semáforo de matchmaking (verde / amarelo / vermelho). |
| **Override de incompatibilidade** | Organizador força luta vermelha. |
| **Luta manual** | Luta fora do matchmaking, sem validação. Saída de emergência. |
| **Luta vacante** | Luta sem destino após corte/no-show, aguardando decisão do organizador. |
| **Catálogo** | Dimensões oficiais (peso, faixa etária, nível) por modalidade. Read-only no MVP. |
| **Atributos brutos** | Peso, idade, sexo, nível, modalidades declarados pelo atleta. Mapeados para categoria na inscrição. |
| **Peso pretendido** | Peso planejado para o dia (não atual). Declarado na inscrição, validado na pesagem. |
| **Tenant** | Organizador. Dados do organizador isolados por `organizer_id`; dados globais (atletas, cartéis, catálogos) compartilhados. |
| **SLO** | Service Level Objective — alvo de desempenho (latência, disponibilidade). |
| **RPO / RTO** | Recovery Point Objective (perda de dados aceitável) / Recovery Time Objective (tempo de recuperação aceitável). |
| **Anonimização** | Exclusão de dados pessoais preservando registros esportivos de terceiros (resposta a direito LGPD). |
| **Soft delete** | Marcação de registro como inativo, reversível (saída de operação, não direito LGPD). |
| **Visualização de chave** | Tela por GP mostrando progressão do torneio. Coexiste com o card cronológico. |

---

*Fim do documento v0.8 — Levantamento de requisitos concluído. Próxima etapa: arquitetura.*
