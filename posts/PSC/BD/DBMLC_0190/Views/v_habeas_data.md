# View: v_habeas_data

## Usa los objetos:
- [[spiga_HabeasData]]

```sql
create view v_habeas_data as
select distinct Pkterceros,Nombres,NumDocumento,ValorBool
from [PSCService_DB].[dbo].[spiga_HabeasData]
```
