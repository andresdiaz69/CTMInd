# View: v_Novasoft_Actualizacion_RedesSoc

## Usa los objetos:
- [[GTH_EmpRedSocial]]
- [[GTH_RedesSociales]]
- [[rhh_emplea]]
- [[v_Novasoft_Actualizacion_RedesSociales]]

```sql

CREATE view [dbo].[v_Novasoft_Actualizacion_RedesSoc] as
select fecha,CodigoEmpleado,NombreEmpleado,Apellido1,Apellido2,
Facebook=max(Facebook),YouTube=max(YouTube),Whatsapp=max(Whatsapp),Instagram=max(Instagram),
LinKedln=max(LinKedln),Snapchat=max(Snapchat),Twitter=max(Twitter),Skype=max(Skype),
Pinterest=max(Pinterest),Spotify=max(Spotify),[Google+]=max([Google+])
from(
		select a.fecha,CodigoEmpleado=s.cod_emp,NombreEmpleado=e.nom_emp,Apellido1=e.ap1_emp,Apellido2=e.ap2_emp,
		Facebook =	case when r.cod_redsoc = 1 then s.usuario else '' end,
		YouTube =	case when r.cod_redsoc = 2 then s.usuario else '' end,
		Whatsapp =	case when r.cod_redsoc = 3 then s.usuario else '' end,
		Instagram = case when r.cod_redsoc = 4 then s.usuario else '' end,
		LinKedln =	case when r.cod_redsoc = 5 then s.usuario else '' end,
		Snapchat =	case when r.cod_redsoc = 6 then s.usuario else '' end,
		Twitter =	case when r.cod_redsoc = 7 then s.usuario else '' end,
		Skype =		case when r.cod_redsoc = 8 then s.usuario else '' end,
		Pinterest = case when r.cod_redsoc = 9 then s.usuario else '' end,
		Spotify =	case when r.cod_redsoc = 10 then s.usuario else '' end,
		"Google+" = case when r.cod_redsoc = 11 then s.usuario else '' end
		from		[Novasoft_CT_MM].dbo.GTH_EmpRedSocial	s	
		left join	[Novasoft_CT_MM].dbo.GTH_RedesSociales	r	on	s.cod_redsoc = r.cod_redsoc
		left join	[Novasoft_CT_MM].dbo.rhh_emplea			e	on	s.cod_emp = e.cod_emp
		left join	v_Novasoft_Actualizacion_RedesSociales	a	on	rtrim(ltrim(a.cedula)) = rtrim(ltrim(s.cod_emp))
		where e.cod_emp <> '0' 
		and (e.fec_egr is null or e.fec_egr > getdate())
) a group by CodigoEmpleado,NombreEmpleado,Apellido1,Apellido2,fecha

```
