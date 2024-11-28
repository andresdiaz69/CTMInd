# View: v_Novasoft_valor_ausentimos_enfermedad

## Usa los objetos:
- [[UnidadDeNegocio]]
- [[v_Novasoft_valor_ausentimos_enfermedad]]

```sql

CREATE view dbo.v_Novasoft_valor_ausentimos_enfermedad as

select e.ano_liq               ,e.per_liq        ,e.fec_liq        ,e.cod_emp
      ,e.Nombres               ,e.cod_con        ,e.nom_con        ,e.Dias
      ,e.val_liq               ,e.Codigo_Cargo   ,e.Nombre_Cargo   ,e.cod_cia
      ,e.nom_cia               ,e.marca          ,e.nombre_marca   ,e.centro
      ,e.nombre_centro         ,e.seccion        ,e.nombre_seccion ,e.Departamento
      ,e.nombre_departamento   ,e.Fecha_Ingreso  ,e.Fecha_Retiro   ,u.CodUnidadNegocio
	  ,u.NombreUnidadNegocio
  from Novasoft_CT_MM.dbo.v_Novasoft_valor_ausentimos_enfermedad e
  left join UnidadDeNegocio u on u.CodCentro  = e.centro
                             and u.CodEmpresa = e.cod_cia
                       	     and u.CodSeccion = e.seccion

```
