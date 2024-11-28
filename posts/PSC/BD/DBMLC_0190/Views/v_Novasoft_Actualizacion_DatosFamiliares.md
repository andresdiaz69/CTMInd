# View: v_Novasoft_Actualizacion_DatosFamiliares

## Usa los objetos:
- [[gen_parentesco]]
- [[gen_tipide]]
- [[GTH_EstCivil]]
- [[GTH_Genero]]
- [[GTH_Ocupacion]]
- [[rhh_emplea]]
- [[rhh_familia]]
- [[rhh_tbclaest]]
- [[v_Novasoft_Actualizacion_Portal]]

```sql
CREATE  view  [dbo].[v_Novasoft_Actualizacion_DatosFamiliares] as
SELECT FechaActualizacion= a.fecha,DocumentoEmpleado=fam.cod_emp,NombreEmpleado=rhh_emplea.nom_emp,Apellido1Empleado=rhh_emplea.ap1_emp,
Apellido2Empleado=rhh_emplea.ap2_emp,NombreFamiliar= fam.nom_fam, Apellido1Familiar=fam.ap1_fam, Apellido2Familiar=fam.ap2_fam,
gen_parentesco.nom_par AS TipoFamiliar,gen_tipide.des_tip AS IdentificacionFamiliar, NumeroDocumentoFamiliar=fam.num_ced,
FechaNacimientoFamiliar=fam.fec_nac,EdadFamiliar=fam.edad_ec,GTH_Genero.des_gen AS GeneroFamiliar, 
GTH_EstCivil.des_est AS EstadoCivilFamiliar, rhh_tbclaest.des_est AS NivelEstudioFamiliar,
GTH_Ocupacion.des_ocu AS ocu_fam, Convive=  case	when fam.ind_conv = 0 then 'NO' 
														when fam.ind_conv = 1 then 'SI'
														else '' end
FROM		[Novasoft_CT_MM].dbo.rhh_familia					fam 
left join	[Novasoft_CT_MM].dbo.gen_parentesco					on fam.tip_fam = gen_parentesco.cod_par 
left join	[Novasoft_CT_MM].dbo.gen_tipide						on fam.tip_ide = gen_tipide.cod_tip 
left join	[Novasoft_CT_MM].dbo.GTH_Genero						on fam.sex_fam = GTH_Genero.cod_gen 
left join	[Novasoft_CT_MM].dbo.GTH_EstCivil					on fam.est_civ = GTH_EstCivil.cod_est 
left join	[Novasoft_CT_MM].dbo.GTH_Ocupacion					on fam.ocu_fam = GTH_Ocupacion.cod_ocu 
left join	[Novasoft_CT_MM].dbo.rhh_tbclaest					on fam.niv_est = rhh_tbclaest.tip_est
left join	[Novasoft_CT_MM].dbo.rhh_emplea						on	fam.cod_emp = rhh_emplea.cod_emp
left join	v_Novasoft_Actualizacion_Portal a	on	fam.cod_emp = a.cedula
where rhh_emplea.cod_emp <> '0'
and  (rhh_emplea.fec_egr is null or rhh_emplea.fec_egr > getdate())
--and Novasoft_CT_MM.dbo.rhh_emplea.cod_emp in ('52126258','79578100')

```
