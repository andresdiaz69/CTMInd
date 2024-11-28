# View: v_MLC_estruc_costo

## Usa los objetos:
- [[v_emp_centro_seccion]]
- [[v_emp_centro_seccion_spiga]]

```sql
create view [dbo].[v_MLC_estruc_costo] as
select isnull(ROW_NUMBER() OVER (ORDER BY [Spiga_Empresa_Centro_Seccion]), 0) AS id,
Novasoft_Empresa_Centro_Seccion,origen,Cod_Dist_Cedula
from (
		select Spiga_Empresa_Centro_Seccion=s.Empresa_centro_seccion,Novasoft_Empresa_Centro_Seccion=n.Empresa_Centro_Seccion,origen,Cod_Dist_Cedula
		from		v_emp_centro_seccion_spiga	s	
		full join	v_emp_centro_seccion		n	on	s.Empresa_centro_seccion=n.Empresa_centro_seccion
		where s.Empresa_centro_seccion is null
) a

```
