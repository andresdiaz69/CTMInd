# View: vw_Novasoft_Fotos

## Usa los objetos:
- [[v_MLC_Fotos]]
- [[v_Novasoft_Actualizacion_Foto]]

```sql
CREATE view [dbo].[vw_Novasoft_Fotos] as
select a.fecha,f.* 
from [Novasoft_CT_MM].dbo.v_MLC_Fotos	f
left join v_Novasoft_Actualizacion_Foto	a	on f.cedula = a.cedula


```
