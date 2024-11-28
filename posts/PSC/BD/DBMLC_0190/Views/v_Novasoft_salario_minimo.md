# View: v_Novasoft_salario_minimo

## Usa los objetos:
- [[nom_vargen]]

```sql

CREATE view [dbo].[v_Novasoft_salario_minimo] as
select	nom_var,val_var,Año= year(getdate())
from	[Novasoft_CT_MM].dbo.nom_vargen 
where	num_var = 60


```
