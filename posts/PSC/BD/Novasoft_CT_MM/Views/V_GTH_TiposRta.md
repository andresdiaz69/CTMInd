# View: V_GTH_TiposRta

## Usa los objetos:
- [[GTH_TipoRta]]

```sql
CREATE VIEW [dbo].[V_GTH_TiposRta]
AS
SELECT        tip_rta, des_tip
FROM            dbo.GTH_TipoRta
WHERE        (tip_rta IN ('NOVASOFT01', 'NOVASOFT02', 'NOVASOFT03', 'NOVASOFT04', 'NOVASOFT05', 'NOVASOFT06', 'NOVASOFT07'))

```
