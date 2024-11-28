# View: vw_ComercialVNPorCom_1

## Usa los objetos:
- [[vw_ComercialVNPorCom_1_VN]]
- [[vw_ComercialVNPorCom_1_VOVN]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorCom_1]
AS
SELECT        *
FROM            vw_ComercialVNPorCom_1_VN
UNION ALL
SELECT        *
FROM            vw_ComercialVNPorCom_1_VOVN






```
