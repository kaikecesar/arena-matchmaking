# Cadastro de Identidade do Atleta — Documento de Requisitos

> Documento de requisitos da primeira fatia do domínio de atleta: cadastro e consulta do perfil de identidade.

---

## Metadados

| Campo | Valor |
|---|---|
| **Versão** | 0.1 |
| **Data** | 28 de maio de 2026 |
| **Autor** | Kaike Cesar Oliveira |
| **Status** | Em desenvolvimento |
| **Documento-pai** | [REQUIREMENTS.md](./REQUIREMENTS.md) v0.8 |

---

## 1. Propósito

Permitir que um usuário autenticado registre seu **perfil de identidade como atleta** na plataforma — o "registro civil esportivo" — e que esse perfil possa ser consultado.

Esta é a primeira de quatro fatias que compõem o domínio do atleta (ver §6). Aqui se estabelece a entidade base sobre a qual modalidades, cartel e vínculos com coaches serão construídos nas fatias seguintes.

---

## 2. Escopo

### 2.1 No escopo

- Cadastro do perfil de identidade do atleta vinculado a uma conta de usuário existente
- Consulta de perfil de atleta por identificador

### 2.2 Fora do escopo desta fatia

| Tema | Onde será tratado |
|---|---|
| Modalidades praticadas e dados competitivos | Fatia 2 |
| Cartel (regra do piso, edição, auditoria) | Fatia 3 |
| Coaches e vínculos atleta–coach | Fatia 4 |
| Incremento automático de cartel | Fase Evento |
| Cadastro de atleta por terceiros (coach cadastrando) | v2 — ver §5.1 |
| Validação do dígito verificador do CPF | Validação futura — ver §5.3 |
| Atestado médico e autorização parental | Fase Evento (associados à inscrição, não ao perfil — §7.3 do REQUIREMENTS) |

---

## 3. Referências ao Documento-Pai

| Referência | O que reforça nesta fatia |
|---|---|
| §1.4 — Personas | O atleta é persona de suporte, mas é a entidade central do produto após o organizador |
| §2.5 — Foco no Brasil no MVP | Documento de identificação é CPF; estrutura aberta para internacionalização (tipo + valor) |
| §2.17 — Multi-tenancy | Atleta é entidade **global** — não carrega discriminador de organizador |
| §3.1 — Identidade do atleta | Define o conjunto canônico de campos de identidade |
| §3.6 — Estado do atleta | Sem modelagem complexa de estados — o atleta existe e pode se inscrever |

---

## 4. Personas Envolvidas

| Persona | Papel nesta fatia |
|---|---|
| **Usuário autenticado** | Único agente capaz de criar um perfil de atleta — e o perfil criado pertence necessariamente a ele |
| **Atleta** | Identidade resultante desta operação. No MVP, atleta e usuário são a mesma pessoa (relação 1:1) |

> Coach e Organizador não atuam nesta fatia.

---

## 5. Regras de Negócio

### 5.1 Relacionamento Usuário ↔ Atleta — 1:1 Obrigatório no MVP

- **Cada perfil de atleta pertence a um, e somente um, usuário.**
- **Cada usuário pode ter, no máximo, um perfil de atleta.**
- O perfil de atleta é criado pelo próprio usuário dono da conta. Não é possível criar perfil de atleta para outra pessoa nesta fatia.

> **Decisão adiada — v2:** A possibilidade de coach cadastrar atleta (§3.5 do REQUIREMENTS, "coach pode cadastrar atletas") fica fora do MVP. Habilitá-la exige fluxos adicionais (reivindicação de conta, deduplicação por documento, autorização parental antecipada) que não cabem na fatia inicial. A modelagem da relação é deliberadamente apertada agora — relaxá-la depois é trivial; apertar depois exige migração de dados.

### 5.2 Campos da Identidade

Inspirado em §3.1 do REQUIREMENTS. **Não duplica** o que já vive no cadastro de usuário (nome, email, telefone, data de cadastro permanecem na conta de usuário).

| Informação | Obrigatório | Observação |
|---|---|---|
| Data de nascimento | Sim | Data pura, sem horário |
| Sexo | Sim | Catálogo fechado de valores |
| Tipo de documento | Sim | No MVP, apenas CPF. Estrutura aberta para internacionalização futura |
| Valor do documento | Sim | Armazenado em formato canônico (sem máscara) |
| Foto do atleta | Não | URL/referência à imagem |

### 5.3 Unicidade do Documento

- A combinação **tipo de documento + valor do documento** é única em toda a plataforma.
- Dois atletas nunca podem compartilhar o mesmo documento.
- Esta unicidade é o mecanismo de deduplicação do atleta no nível global.

> **Decisão adiada:** validação do dígito verificador do CPF não entra nesta fatia. A plataforma confia no input humano (§2.1 do REQUIREMENTS, "confiança no input humano") e valida apenas o formato superficial. Validação algorítmica é melhoria futura — não bloqueia o MVP.

### 5.4 Privacidade dos Dados

A unicidade global do documento implica que a plataforma pode **detectar** que um documento já está em uso, mas **não revela** a quem pertence. A mensagem de erro retornada em caso de conflito não expõe o dono do documento existente.

---

## 6. Operações Suportadas

### 6.1 Cadastrar Perfil de Atleta

**Pré-condições:**
- Usuário autenticado
- Usuário ainda não possui perfil de atleta
- Documento informado não está em uso por outro atleta

**Pós-condições:**
- Perfil de atleta criado e vinculado ao usuário
- Atleta passa a existir como entidade global e pode ser referenciado em fatias futuras

### 6.2 Consultar Perfil de Atleta

**Pré-condições:**
- Usuário autenticado
- Identificador de atleta informado existe

**Pós-condições:**
- Dados de identidade do atleta retornados ao solicitante

> **Decisão de visibilidade:** qualquer usuário autenticado pode consultar qualquer atleta nesta fatia. Justificativa: organizadores e coaches precisarão consultar atletas para operações futuras (escalação, inscrição, vínculo), e §3.8 do REQUIREMENTS prevê transparência de dados do atleta para o organizador. Restrições finas por papel (organizador vê dados que coach não vê, etc.) ficam para quando os papéis estiverem modelados.

---

## 7. Casos de Erro

| Situação | Comportamento esperado |
|---|---|
| Usuário não autenticado tenta cadastrar ou consultar | Operação rejeitada com indicação de necessidade de autenticação |
| Usuário autenticado tenta criar segundo perfil de atleta para si | Operação rejeitada — viola §5.1 |
| Tentativa de cadastro com documento já em uso | Operação rejeitada — viola §5.3. Mensagem não revela o dono do documento existente (§5.4) |
| Consulta a identificador de atleta inexistente | Operação rejeitada com indicação de "não encontrado" |
| Dados de entrada incompletos ou em formato inválido | Operação rejeitada com indicação do(s) campo(s) problemático(s) |

---

## 8. Pontos de Atenção e Decisões Adiadas

### 8.1 Edição do Perfil
Esta fatia entrega **somente cadastro e consulta**. Edição dos dados de identidade (corrigir data de nascimento, atualizar foto, trocar documento) **não está incluída**. Fica para uma fatia posterior, quando houver definição de regras (quais campos são editáveis? quem pode editar? edição gera auditoria?).

### 8.2 Exclusão / Anonimização
A Seção 10.6.3 do REQUIREMENTS define exclusão como **anonimização irreversível** (direito ao esquecimento). Nesta fatia, a exclusão não é exposta como operação — fica para a implementação da política LGPD geral, que abrange todas as entidades de uma só vez. Estruturalmente, o perfil já nasce preparado para suportar marcação de inatividade.

### 8.3 Idade Mínima
O REQUIREMENTS não estabelece idade mínima genérica para cadastro de atleta — a restrição etária é **consequência do mapeamento para categoria do catálogo** na inscrição (§7.4 do REQUIREMENTS). Esta fatia, portanto, **aceita qualquer data de nascimento** dentro do limite trivial de ser uma data passada e plausível. Restrições de idade só aparecem quando o atleta tentar se inscrever em um evento.

### 8.4 Foto do Atleta
O campo recebe uma referência (URL) à imagem. **Upload de arquivo, armazenamento em storage, regras de tamanho e formato não entram nesta fatia.** A operação de upload é uma capacidade transversal que será modelada quando aparecer a primeira demanda real (foto de atleta ou documentos da inscrição) — não vale construí-la agora isolada.

---

## 9. Critérios de Aceite

Esta fatia se considera concluída quando:

1. Um usuário autenticado consegue cadastrar seu perfil de identidade como atleta, informando os campos obrigatórios do §5.2.
2. O cadastro é rejeitado quando o usuário já possui perfil de atleta.
3. O cadastro é rejeitado quando o documento informado já está em uso por outro atleta, sem revelar o dono.
4. Qualquer usuário autenticado consegue consultar um perfil de atleta existente pelo seu identificador.
5. A consulta a um identificador inexistente é rejeitada de forma clara.
6. Operações sem autenticação são rejeitadas.

---

## 10. Backlog Decorrente desta Fatia

Itens identificados durante o levantamento que **não** entram aqui:

- Edição de campos de identidade do atleta (§8.1)
- Upload e gerenciamento de imagem da foto (§8.4)
- Validação do dígito verificador do CPF (§5.3)
- Cadastro de atleta por coach (§5.1)
- Restrições finas de visibilidade por papel (§6.2)

---

*Fim do documento v0.1.*
