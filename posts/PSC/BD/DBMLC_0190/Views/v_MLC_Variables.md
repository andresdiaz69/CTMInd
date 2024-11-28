# View: v_MLC_Variables

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Variables]]
- [[VariablesVersiones]]

```sql
create view v_MLC_Variables as
select v.IdComisionModeloSub,s.NombreModeloSub,v.idVariable,v.NombreVariable,v.DescripcionVariable,a.IdVariableVersion,a.ValorVariable
from		Variables				v
left join	ComisionesModelosSub	s	on	v.IdComisionModeloSub = s.IdComisionModeloSub
left join	VariablesVersiones		a	on	v.IdVariable = a.IdVariable

```
