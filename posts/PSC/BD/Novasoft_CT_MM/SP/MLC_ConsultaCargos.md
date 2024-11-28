# Stored Procedure: MLC_ConsultaCargos

## Usa los objetos:
- [[rhh_cargos]]

```sql

CREATE PROCEDURE [dbo].[MLC_ConsultaCargos]    AS


select empresa=1,c.cod_car,c.nom_car,c.sal_bas,niv_car
from rhh_cargos     c

```
